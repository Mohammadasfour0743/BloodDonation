import { router } from 'expo-router';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, GeoPoint, getDoc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { runInAction } from 'mobx';
import { reactiveModel } from './bootstrapping';
import { reaction } from 'mobx';
import { firebaseConfig } from './firebaseconfig.js';
import * as Location from 'expo-location';
import { GeoFirestore } from 'geofirestore';
import * as geofireUtils from 'geofire-common';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const geofirestore = new GeoFirestore(db);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });

const COLLECTION1 = 'donors';
const COLLECTION2 = 'requests';

global.doc = doc;
global.setDoc = setDoc;
global.app = db;

export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user.email);

      reactiveModel.user.uid = user.uid;
      await requestLocationPermission();
      connectToPersistence();
      console.log('User bloodtype after signin:', reactiveModel.user.bloodtype);

      return userCredential;
    })
    .catch((error) => {
      console.error('Sign In Error:', error.message);
      throw error;
    });
}

export async function signUp(email, password, bloodtype) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);

    const location = await getCurrentLocation();
    const geoPoint = location ? new GeoPoint(location.coords.latitude, location.coords.longitude) : null;
    const coordinates = location
      ? geofireUtils.geohashForLocation([location.coords.latitude, location.coords.longitude])
      : null;

    await setDoc(doc(db, 'donors', user.uid), {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
      location: geoPoint,
      coordinates: coordinates,
      g: {
        geohash: coordinates,
        geopoint: geoPoint,
      },
    });

    reactiveModel.user = {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
      location: geoPoint,
      coordinates: coordinates,
    };

    return userCredential;
  } catch (error) {
    console.error('Sign Up Error:', error.message);
    throw error;
  }
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      console.log('User bloodtype after logOut:', reactiveModel.user.bloodtype);
    })
    .catch((error) => {
      console.error('Sign Out Error:', error.code, error.message);
    });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    reactiveModel.user.uid = user.uid;
    connectToPersistence();
    await updateUserLocation();
    router.replace('/(tabs)/requests');
  } else {
    console.log('No user is logged in.');
    reactiveModel.setUser({});
    reactiveModel.clearRequests();
    router.replace('/login');
  }
});

export async function fetchRequests() {
  if (!reactiveModel.user || !reactiveModel.user.bloodtype) {
    console.error('Cannot fetch requests: user or bloodtype not set in model');
    return;
  }
  console.log('Fetching requests for bloodtype:', reactiveModel.user.bloodtype);

  const userLocation = await updateUserLocation();
  if (!userLocation) {
    console.error('cannot fetch with algo');
    regularFetch();
    return;
  }

  const radius = 25;
  const center = [userLocation.latitude, userLocation.longitude];

  const geoRequestCollection = geofirestore.collection(COLLECTION2);

  const geoQuery = geoRequestCollection
    .near({
      center,
      radius,
    })
    .where('current', '==', true)
    .where('bloodTypes', 'array-contains-any', [reactiveModel.user.bloodtype]); //"AB+"

  geoQuery.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log('empty array:', value.docs);
  });
  // const unsubscribe = geoQuery.onSnapshot(
  //   (snapshot) => {
  //     if (snapshot.empty) {
  //       console.warn('No nearby requests found within the radius.');
  //       return;
  //     }

  //     snapshot.docChanges().forEach((change) => {
  //       const data = change.doc.data();
  //       const id = change.doc.id;
  //       // Calculate distance from user
  //       const distanceInKm =
  //         data.g && data.g.geopoint
  //           ? geofireUtils.distanceBetween([data.g.geopoint.latitude, data.g.geopoint.longitude], center)
  //           : null;

  //       const request = {
  //         id,
  //         ...data,
  //         distanceInKm: distanceInKm ? parseFloat(distanceInKm.toFixed(1)) : null,
  //       };

  //       runInAction(() => {
  //         if (change.type === 'added') {
  //           reactiveModel.addRequest(request);
  //         } else if (change.type === 'modified') {
  //           reactiveModel.updateRequests(id, request);
  //         } else if (change.type === 'removed') {
  //           reactiveModel.removeRequest(id);
  //         }
  //       });
  //     });
  //   },
  //   (error) => {
  //     console.error('Error fetching nearby requests:', error);
  //     // Fallback to regular fetch if geospatial query fails
  //     fallbackToRegularFetch();
  //   }
  // );

  // // store the unsubscribe function in the reactive model
  // reactiveModel.unsubscribeGeoQuery = unsubscribe;
  /* const requestsQuery = query(
    collection(db, COLLECTION2),
    where('current', '==', true),
    where('bloodTypes', 'array-contains-any', [reactiveModel.user.bloodtype, 'AB+'])
  );

  onSnapshot(requestsQuery, (snapshot) => {
    if (snapshot.empty) {
      console.warn('No changes detected. Double-check the query and data.');
      return;
    }

    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      const request = { id, ...data };

      runInAction(() => {
        if (change.type === 'added') {
          reactiveModel.addRequest(request);
        } else if (change.type === 'modified') {
          reactiveModel.updateRequests(id, request);
        } else if (change.type === 'removed') {
          reactiveModel.removeRequest(id);
        }
      });
    });
  });

  const allRequestsQuery = collection(db, COLLECTION2);
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      if (
        change.type === 'modified' &&
        (data.current === false || !data.bloodTypes.includes(reactiveModel.user.bloodtype || 'AB+'))
      ) {
        runInAction(() => {
          reactiveModel.removeRequest(id);
        });
      }
    });
  }); */
}

function regularFetch() {
  //fetches according to bloodtype only
  console.log('Returning requests only according to bloodtype');

  const requestsQuery = query(
    collection(db, COLLECTION2),
    where('current', '==', true),
    where('bloodTypes', 'array-contains-any', [reactiveModel.user.bloodtype, 'AB+'])
  );

  onSnapshot(requestsQuery, (snapshot) => {
    if (snapshot.empty) {
      console.warn('No changes detected. Double-check the query and data.');
      return;
    }

    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      const request = { id, ...data };

      runInAction(() => {
        if (change.type === 'added') {
          reactiveModel.addRequest(request);
        } else if (change.type === 'modified') {
          reactiveModel.updateRequests(id, request);
        } else if (change.type === 'removed') {
          reactiveModel.removeRequest(id);
        }
      });
    });
  });

  const allRequestsQuery = collection(db, COLLECTION2);
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      if (
        change.type === 'modified' &&
        (data.current === false || !data.bloodTypes.includes(reactiveModel.user.bloodtype || 'AB+'))
      ) {
        runInAction(() => {
          reactiveModel.removeRequest(id);
        });
      }
    });
  });
}

async function requestLocationPermission() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
}

async function getCurrentLocation() {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return location;
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

async function updateUserLocation() {
  if (!reactiveModel.user.uid) {
    console.log('returned false');
    return;
  }

  try {
    const location = await getCurrentLocation();
    if (!location) {
      console.log('returned false 2');
      return;
    }

    const geoPoint = new GeoPoint(location.coords.latitude, location.coords.longitude);
    const coordinates = geofireUtils.geohashForLocation([location.coords.latitude, location.coords.longitude]);

    await setDoc(
      doc(db, COLLECTION1, reactiveModel.user.uid),
      {
        location: geoPoint,
        coordinates: coordinates,
        g: {
          geohash: coordinates,
          geopoint: geoPoint,
        },
      },
      { merge: true }
    );
    runInAction(() => {
      reactiveModel.user.location = geoPoint;
      reactiveModel.user.coordinates = coordinates;
    });

    return { latitude: location.coords.latitude, longitude: location.coords.longitude };
  } catch (error) {
    console.error('ERROR updating location', error);
    return null;
  }
}

// export function to manually adjust search radius
export async function updateSearchRadius(radiusInKm) {
  if (!reactiveModel.user.uid) return false;

  try {
    await setDoc(
      doc(db, COLLECTION1, reactiveModel.user.uid),
      {
        searchRadius: radiusInKm,
      },
      { merge: true }
    );

    runInAction(() => {
      reactiveModel.user.searchRadius = radiusInKm;
    });

    if (reactiveModel.unsubscribeGeoQuery) {
      reactiveModel.unsubscribeGeoQuery();
    }
    reactiveModel.clearRequests();
    fetchRequests();
    return true;
  } catch (error) {
    console.error('Error updating search radius:', error);
    return false;
  }
}

export function connectToPersistence() {
  if (!reactiveModel.user.uid) {
    console.log('User UID is not set in the reactiveModel. Cannot connect to persistence.');
    return;
  }
  const docToStore = doc(db, COLLECTION1, reactiveModel.user.uid);

  getDoc(docToStore)
    .then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        runInAction(() => {
          reactiveModel.user.username = data.username ?? 'default';
          reactiveModel.user.bloodtype = data.bloodtype ?? 'default';
          if (data.name) reactiveModel.user.name = data.name;
          if (data.location) reactiveModel.user.location = data.location;
          if (data.coordinates) reactiveModel.user.coordinates = data.coordinates;
          if (data.searchRadius) reactiveModel.user.searchRadius = data.searchRadius;
        });
      }
    })
    .catch((error) => console.error('Error reading donor document:', error));

  onSnapshot(docToStore, (snapshot) => {
    const data = snapshot.data();
    if (data) {
      const prevBloodtype = reactiveModel.user.bloodtype;

      runInAction(() => {
        if (data.username) reactiveModel.user.username = data.username;
        if (data.bloodtype) reactiveModel.user.bloodtype = data.bloodtype;
        if (data.name) reactiveModel.user.name = data.name;
        if (data.location) reactiveModel.user.location = data.location;
        if (data.coordinates) reactiveModel.user.coordinates = data.coordinates;
        if (data.searchRadius) reactiveModel.user.searchRadius = data.searchRadius;
      });

      if (prevBloodtype !== data.bloodtype && data.bloodtype) {
        if (reactiveModel.unsubscribeGeoQuery) {
          reactiveModel.unsubscribeGeoQuery();
        }
        if (reactiveModel.unsubscribeRegularQuery) {
          reactiveModel.unsubscribeRegularQuery();
        }
        reactiveModel.clearRequests();
      }
    }
  });

  // react to bloodtype changes
  reaction(
    () => reactiveModel.user.bloodtype,
    (newBloodtype, oldBloodtype) => {
      if (newBloodtype && newBloodtype !== oldBloodtype) {
        if (reactiveModel.unsubscribeGeoQuery) {
          reactiveModel.unsubscribeGeoQuery();
        }
        if (reactiveModel.unsubscribeRegularQuery) {
          reactiveModel.unsubscribeRegularQuery();
        }
        reactiveModel.clearRequests();
        fetchRequests();
      }
    }
  );

  // react to user data changes and sync to Firestore
  reaction(
    () => ({
      username: reactiveModel.user.username,
      name: reactiveModel.user.name,
      bloodtype: reactiveModel.user.bloodtype,
      location: reactiveModel.user.location,
      coordinates: reactiveModel.user.coordinates,
      searchRadius: reactiveModel.user.searchRadius,
    }),
    (userData) => {
      if (!auth.currentUser) return;
      const dataToUpdate = {};
      if (userData.username) dataToUpdate.username = userData.username;
      if (userData.name) dataToUpdate.name = userData.name;
      if (userData.bloodtype) dataToUpdate.bloodtype = userData.bloodtype;
      if (userData.location) dataToUpdate.location = userData.location;
      if (userData.searchRadius) dataToUpdate.searchRadius = userData.searchRadius;
      if (userData.coordinates) {
        dataToUpdate.coordinates = userData.coordinates;
        dataToUpdate.g = {
          geohash: userData.coordinates,
          geopoint: userData.location,
        };
      }

      if (Object.keys(dataToUpdate).length === 0) return;

      setDoc(docToStore, dataToUpdate, { merge: true }).catch((err) =>
        console.error('Error syncing to Firestore:', err)
      );
    }
  );

  // Update location periodically if user is active
  const locationUpdateInterval = setInterval(
    async () => {
      if (reactiveModel.user.uid) {
        await updateUserLocation();
      }
    },
    15 * 60 * 1000
  ); // Update every 15 minutes

  // Clean up interval when user logs out
  reaction(
    () => reactiveModel.user.uid,
    (uid) => {
      if (!uid && locationUpdateInterval) {
        clearInterval(locationUpdateInterval);
      }
    }
  );
}
