import { Image, StyleSheet, Platform, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Incoming Requests:</ThemedText>
      </View>
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop:100,
    marginLeft:20,
    gap: 8,
  },
  
});
