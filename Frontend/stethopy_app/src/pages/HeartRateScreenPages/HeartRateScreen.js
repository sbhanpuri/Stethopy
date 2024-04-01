import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import PastListImage from '../../components/images/PastListening.png';
/**
 * This page serves as the landing page to either start a new heart recording or view past heart recordings
 * 
 * 
 */

function HeartRateScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewListeningSessionPage');
          console.log('You tapped the button!');
        }}
        style={styles.customButton}
      >
      <Text style={styles.buttonText}>New Listening Session</Text>
      </TouchableOpacity>

      <Image 
        source={PastListImage}
        style={styles.image}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PastSessionListeningPage');
          console.log('You tapped the button!');
        }}
        style={styles.customButton2}
      >
      <Text style={styles.buttonText}>Past Listening Sessions</Text>
      </TouchableOpacity>

      <BottomTabNavigator></BottomTabNavigator>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change the background color as needed
  },
  title: {
    justifyContent: 'center',
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  customButton: {
    backgroundColor: '#9fc5e8',
    borderRadius: 50,
    position: 'absolute',
    padding: 10,
    width: 300,
    height: 45,
    top: 20,
  },
  customButton2: {
    backgroundColor: '#9fc5e8',
    borderRadius: 50,
    position: 'absolute',
    padding: 10,
    width: 300,
    top: 150,
  },
  buttonText: {
    color: 'black', // Change text color
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  image: {
    width: 300,
    height: 100,
    bottom: 275,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
});

export default HeartRateScreen;