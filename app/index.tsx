import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <Pressable onPress={()=>{
            router.push("/(tabs)")
        }}>
            <Text>Home</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

