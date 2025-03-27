import { Image, StyleSheet, Platform, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.titleContainer}>
      <View style={styles.text}>
        <ThemedText type="title">Incoming Requests:</ThemedText>
      </View>
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor:"#780000",
    
  },
  text:{
    marginTop:100,
    marginLeft:20,
    gap: 8,
  }
});
