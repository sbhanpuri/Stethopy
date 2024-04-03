import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

/**
 * !!!!!!
 * Not to be used in actual app design, but contains logic for recording button!
 */

const RecordingButton = () => {
  // console.log(prop);
  const navigation = useNavigation();
  const [showTimer, setShowTimer] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);
  const [waveformPlot, setWaveformPlot] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);
  const [timer, setTimer] = useState(0);
  //const [autoTimerStop, setAutoTimerStop] = useState();
  //const [timerVisible, setTimerVisible] = useState(true);  

  

  const TimerComponent = ({ recordingStatus }) => {

    //Create a function and call stopRecording when timer hits 10 seconds
    /*function autoStop() {
      setTimeout(() => {
        stopRecording();
      }, 10000);
    };*/

    /*useEffect(() => {
      return () => {
        setTimerVisible(false);
        setTimer(0);
      }
    }, []);
  
    useEffect(() => {
      if (!timerVisible) {
        setTimerVisible(true);
        setTimer(0);
      }
    }, [timerVisible]);*/

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    
    useEffect(() => {
      // Watch for changes in the navigation state
      const unsubscribe = navigation.addListener('state', () => {
        stopRecording();
        setTimer(0); // Reset timer to 0 if navigation changes
        
      });
    
      return unsubscribe; // Clean up the subscription when the component unmounts
    }, [navigation]);

    //get it to stop recording after 30 seconds
    //get timer to completely stop, so when you return to the page, it doesn't start running from 0 unless you press start 
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      console.log("Timer", timer)
      //setIsTimerRunning(false);
      //setPreviousTime(timer);
      return () => clearInterval(interval);
      //console.log(previousTime);
  }, [recordingStatus, timer]);
    if (timer < 10) {
      return (
        <Text style={styles.timer}>
          00:0{timer}
        </Text>
      )
    } else {
      return (
        <Text style={styles.timer}>
          00:{timer}
        </Text>      
      )
    }
  };
  

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
      if (recordingStatus === 'recording') {
        stopRecording();
      }
    };
  }, []);


  const startRecording = async() => {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      if (recording) {
        console.log('Stopping previous recording');
        await recording.stopAndUnloadAsync();
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
  };


  const stopRecording = async({ previousTime }) => {
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
        //setDuration(previousTime);
        // const playbackObject = new Audio.Sound();
        // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}`});
        // await playbackObject.playAsync();

        setRecording(null);
        setRecordingStatus('stopped');
        setPreviousTime(timer);
        
        return FileSystem.documentDirectory + 'recordings/' + `${fileName}`;
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  async function RecordButtonPress({ navigation }) {
    try{
      if (timer > 0 || navigation) {
        setTimer(0);
      }
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
            const response = await axios.post('http://10.193.136.224:5000/sessions/process-audio', jsonPayload);
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
    } catch (error) {
      console.error('Error during recording or processing:', error);
    }
  }

  return (
      <View style={styles.container}>

      <Text style={styles.HeartRateObservation}>
        Tap to Record
      </Text>

      <TouchableOpacity style={styles.recordButton} onPress={RecordButtonPress} >
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={36} color="red" />
      </TouchableOpacity>
      {/* <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}
      </Text> */}

      {recordingStatus === 'recording' && <TimerComponent />}
      {recordingStatus === 'stopped' && previousTime<10 && <Text style={styles.timerAfter}>Duration: 00:0{previousTime}</Text>}
      {recordingStatus === 'stopped' && previousTime>=10 && <Text style={styles.timerAfter}>Duration: 00:{previousTime}</Text>}


      {waveformPlot && (
        <Image source={{ uri: `data:image/png;base64,${waveformPlot}` }} style={{ width: 300, height: 150 }} />
      )}
      </View>
  );
}


const styles = StyleSheet.create({
  timerAfter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 10,
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 37,
    marginTop: 20,
    fontSize: 20,
  },
  title: {
    justifyContent: 'center',
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  customButton: {
    backgroundColor: 'white', // Change button background color
    padding: 15,
    borderRadius: 50, // Adjust border radius for rounded corners
    marginTop: 400,
    width: 200,
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', // Change text color
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordButton: {
  alignItems: 'center',
  justifyContent: 'center',
  width: 50, // Smaller width
  height: 50, // Smaller height
  borderRadius: 35, // Adjusted for the smaller size to keep it circular
  backgroundColor: 'white',
  marginTop: 15, // Example to move the button down from the top of its container
  marginLeft: 40,
  borderWidth: 1, // Width of the border
  borderColor: 'black',
  },
  HeartRateObservation: {
    fontSize: 20,
    marginTop: 160,
    marginLeft: 5,
    fontFamily: 'HelveticaNeue-Thin',
    color: '#C42021',
  },
});


export default RecordingButton;


// Conditionally render the duration text based on the duration value  

  /*useEffect(() => {
    return () => {
      setTimerVisible(false);
      setTimerValue(0);
    }
  }, []);

  useEffect(() => {
    if (!timerVisible) {
      setTimerVisible(true);
      setTimerValue(0);
    }
  }, [timerVisible]);*/

  /*const HomeScreen = ({ navigation }) => {  
    // Effect to show the timer when navigating to the Home screen
    useEffect(() => {
      setShowTimer(true);
    }, [navigation]);
    return (
      <View>
        {showTimer && <TimerComponent />}
      </View>
    );
  };

  const OtherScreen =({ navigation }) => {
    useEffect(() => {
      setShowTimer(false);
      setTimer(0);
    }, [navigation]);
    return (
      <View>
        {!showTimer && <TimerComponent />}
      </View>
    );
  };*/

  /*async function startRecordingAndAutoStop() {
    // Start the recording asynchronously
    await startRecording();
  
    // After starting the recording, call autoStop() to automatically stop recording after 10 seconds
    autoStop();
  }*/