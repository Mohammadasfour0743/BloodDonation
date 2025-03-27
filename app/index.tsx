import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
