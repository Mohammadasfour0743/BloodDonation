import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={()=>{
            router.replace("/(tabs)")
        }}>
            <Text>Login</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    borderColor:"gray",
    borderWidth:2,
    borderRadius:10,
    backgroundColor:"white",
    padding:8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

