//import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';

function HeartRateScreen({ navigation }) {
  const [wavePath, setWavePath] = useState('');

  useEffect(() => {
    // Simulate recorded audio data (replace with actual recorded data)
    const recordedAudioData = /* ... */

    // Send the recorded audio data to the Flask backend
    fetch('http://localhost:50432/process-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioData: recordedAudioData }),
    })
      .then(response => response.json())
      .then(data => setWavePath(data.result))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Thin', fontWeight: 'bold', color: 'black' }}>
        WAVE FILE
      </Text>

      {wavePath ? (
        <Svg height="100" width="100%">
          <Path d={wavePath} fill="none" stroke="black" strokeWidth="2" />
        </Svg>
      ) : (
        <Text>Loading waveform...</Text>
      )}

      <BottomTabNavigator></BottomTabNavigator>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(200, 100%, 77%, 1)', // Change the background color as needed
  },
  title: {
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
});


export default HeartRateScreen;