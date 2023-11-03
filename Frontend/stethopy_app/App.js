import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <Text>Wave Input: </Text>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('HeartRateScreen')}
      >
        Your Heart Rate
      </Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});