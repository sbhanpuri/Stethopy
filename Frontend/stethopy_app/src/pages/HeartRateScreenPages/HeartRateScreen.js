import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

/**
 * This page serves as the landing page to either start a new heart recording or view past heart recordings
 * 
 * 
 */

function HeartRateScreen({ navigation }) {


  return (

    <View style={styles.container}>

      <TouchableOpacity
      onPress={() => {navigation.navigate('ListeningSessions')
      console.log('You tapped the button!');
      }}
      title="New Listening Session"
      style = {styles.customButton}
      />

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
    justifyContent: 'center',
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  customButton: {
    backgroundColor: 'white', // Change button background color
    padding: 15,
    borderRadius: 10, // Adjust border radius for rounded corners
    marginTop: 20,
    width: 200,
    height: 50,
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
});

export default HeartRateScreen;