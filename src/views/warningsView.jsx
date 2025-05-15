import { useRef, useState } from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Dots from 'react-native-dots-pagination';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export function WarningsView(props) {
  const pages = [
    {
      text: 'The safety of patients is our top priority, that is why we will ask you to review the following information carefully.',
      title: 'Welcome to BloodShare, a real-time blood donation application',
      img: 'icon',
    },
    {
      text: 'To be eligible to donate you should be at least 18 years old and weigh at least 50kg. You also need to be in good general health and feel well on the day of donation.',
      title: 'Thank you for considering donating blood',
      img: 'checklist',
    },
    {
      text: 'You cannot donate blood after traveling to certain countries with high risk of infectious diseases such as malaria. You will also have to wait after consuming certain medications. ',
      title: 'Restrictions',
      link: 'https://www.mskcc.org/about/get-involved/donating-blood/medications',
      img: 'travel',
    },
    {
      text: 'If you’ve ever been diagnosed with HIV, hepatitis, or certain infections like syphilis, you won’t be eligible to donate. It is also very important to be upfront about your medical history!',
      title: 'Medical history',
      img: 'virus',
    },
    {
      text: 'Drink fluids for 24–48 hours, avoid heavy activity for 5 hours, eat well, and lie down if you feel dizzy.',
      title: 'Post donation',
      img: 'water_bottle',
    },
    {
      text: 'By continuing, you confirm you’ve read and accepted these guidelines. More information is available in the Information page.',
      title: '',
    },
  ];
  const images = {
    icon: require('../../assets/images/warnings_logo.png'),
    travel: require('../../assets/images/travel.png'),
    virus: require('../../assets/images/virus.png'),
    water_bottle: require('../../assets/images/water_bottle.png'),
    checklist: require('../../assets/images/checklist.png'),
  };
  const ref = useRef(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PagerView
        ref={ref}
        style={{ flex: 1, h: '100%' }}
        initialPage={0}
        scrollEnabled={true}
        onPageSelected={(e) => props.setPage(e.nativeEvent.position)}
      >
        {pages.map((text, index) => (
          <View style={{ justifyContent: 'space-around', flex: 1 }} key={index.toString()}>
            <View style={{ flex: 1, marginTop: 80 }}>
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,

                  marginBottom: 50,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 26,
                    textAlign: 'center',
                    width: '80%',
                    color: '#9a4040',
                  }}
                >
                  {text.title}
                </Text>
              </View>
              {text.img && (
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    height: 250,
                  }}
                >
                  {text.img && (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                      source={images[text.img]}
                    />
                  )}
                </View>
              )}

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 20,
                  height: 200,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'roboto-medium',
                    fontSize: 17,
                    gap: 16,
                  }}
                >
                  {text.text}
                  {text.link && (
                    <Text
                      style={{
                        color: '#9a4040',
                        textDecorationLine: 'underline',
                        fontFamily: 'roboto-bold',
                        margin: 10,
                        width: '100%',
                        paddingLeft: 10,
                      }}
                      onPress={() => Linking.openURL(text.link)}
                    >
                      {'Find out more'}
                    </Text>
                  )}
                </Text>
              </View>
              <View style={{ alignItems: 'center', gap: 15, flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (index == pages.length - 1) props.continue();
                    else ref.current?.setPage(index + 1);
                  }}
                  style={{
                    borderRadius: 20,
                    padding: 12,
                    backgroundColor: '#9a4040',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40%',
                  }}
                >
                  <Text style={{ color: 'white', fontFamily: 'roboto-medium' }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </PagerView>
      <View style={styles.dots}>
        <Dots length={pages.length} active={props.page} activeColor="#9A4040" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  page: { justifyContent: 'space-evenly' },
  scrollContent: {},
  text: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },

  button: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    backgroundColor: '#9A4040',
  },

  dots: {},
});
