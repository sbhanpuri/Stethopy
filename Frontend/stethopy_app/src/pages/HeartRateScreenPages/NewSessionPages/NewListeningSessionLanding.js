import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomTabNavigator from '../../../components/BottomTabNavigator';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Stockimg from '../../../components/images/doctor_image.webp';

/**
 * !!!!!!
 * Not to be used in actual app design, but contains logic for recording button!
 */

function NewListeningSessionLanding({ navigation, route }) {
  const { sessionId, setSessionId } = route.params;

  async function CreateNewSession() {
    const jsonPayload = {
      patient_id: 5
    };
    // Send the audio file to the Flask backend
    const response = await axios.post('http://10.193.136.224:5000/sessions/create_session', jsonPayload);
    console.log(response);

    const newSessionId = response.data.id;
    setSessionId(newSessionId);

  }

  
  return (
      <View style={styles.container}>
      
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('HeartRateScreen');
        console.log('You tapped the button!');
      }}
      style={styles.customButton2}
    >
      <Text style={styles.buttonText}>All Recordings</Text>
      </TouchableOpacity>

    <Text style={styles.title}>How to use Stethopy</Text>
    <Image 
          source={Stockimg}
          style={styles.image}
        />

      
    
      <TouchableOpacity
        onPress={async () => {
          await CreateNewSession();
          navigation.navigate('HeartRecordStep1');
          console.log('You tapped the button!');
        }}
        style={styles.customButton}
      >
        <Text style={styles.title2}>
          Begin Listening
        </Text>
      </TouchableOpacity>

      <BottomTabNavigator></BottomTabNavigator>


      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C42021',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 20,
    fontFamily: 'HelveticaNeue-Thin',
  },
  customButton: {
    backgroundColor: 'white',
    borderColor: '#C42021', // Add a border for emphasis
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 15, // Increase vertical padding for a larger button
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: 200,
  },
  title2: {
    fontSize: 18, // Adjust font size to fit better within the button
    fontWeight: 'bold',
    color: '#C42021',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Thin',
  },
  customButton2: {
    backgroundColor: '#9fc5e8',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    width: 150,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default NewListeningSessionLanding;