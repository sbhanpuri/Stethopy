import { View, Text, Button, StyleSheet, TouchableOpacity, Image,  ScrollView } from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

function ListeningSessions({ navigation }) {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);
  const [waveformPlot, setWaveformPlot] = useState(null);

  useEffect(() => {
    
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    getPermission()

    return () => {
      if(recording) {
        stopRecording();
      }
    };
  }, []);


  async function startRecording() {
    try{
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }


  async function stopRecording() {
    try {
      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        const fileName = `recording-${Date.now()}.caf`;

        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`

        });

        // const playbackObject = new Audio.Sound();
        // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}`});
        // await playbackObject.playAsync();

        setRecording(null);
        setRecordingStatus('stopped');

        return FileSystem.documentDirectory + 'recordings/' + `${fileName}`;
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function RecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', audioUri);

        try {
          const fileContent = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });
          const uint8Array = base64.toByteArray(fileContent);
          const base64String = base64.fromByteArray(uint8Array);
    
          const jsonPayload = {
            audio_data: base64String
          };
          // Send the audio file to the Flask backend
          const response = await axios.post('http://50432/process-audio', jsonPayload);
          console.log(response);

          console.log('Successfully sent audio file to backend and retrieved output.wav from post request');

          const waveformPlotBase64 = response.data.waveform_plot;

          // Display waveform plot as an image in your React Native component
          setWaveformPlot(waveformPlotBase64);
          

        } catch (error) {
          console.error('Error sending audio file to backend:', error);
        }
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Thin', fontWeight: 'bold', color: 'black' }}>
        Observe your Heart Rate:
      </Text>

      <TouchableOpacity style={styles.recordButton}
        onPress={RecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity>
      <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}
      </Text>

      <ScrollView horizontal={true}>
        {waveformPlot && (
          <Image 
            source={{ uri: `data:image/png;base64,${waveformPlot}` }} 
            style={{ width: 1000, height: 400 }}  // Adjust width as needed
          />
        )}
      </ScrollView>

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
    justifyContent: 'center',
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  customButton: {
    backgroundColor: 'white', // Change button background color
    padding: 5,
    borderRadius: 1, // Adjust border radius for rounded corners
    marginTop: 20,
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
    width: 100,
    height: 100,
    borderRadius: 64,
    backgroundColor: 'red',
  },
});


export default ListeningSessions;