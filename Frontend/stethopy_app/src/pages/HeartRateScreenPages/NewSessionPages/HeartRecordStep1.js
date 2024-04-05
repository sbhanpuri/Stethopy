import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import BottomTabNavigator from '../../../components/BottomTabNavigator';
import RecordingButton from '../../../components/RecordingButton'
import RecordPageImage from '../../../components/images/RecordPage1Image.jpg'
import Circle from '../../../components/images/Red_circle.svg.png';
//import { fetchData } from './ListeningSessions/RecordButtonPress';
//import { FontAwesome } from '@expo/vector-icons';
//import ListeningSessions from './ListeningSessions';

const HeartRecordStep1 = ({ navigation, route }) => {
  const { sessionId } = route.params;
  //const [recordingStatus, setRecordingStatus] = useState('idle');
  const [isVisible, setIsVisible] = useState(true);
  // console.log(recordingStatus + 'in page')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          Measurement 1: Right heart
        </Text>
        <Image 
          source={RecordPageImage}
          style={styles.image}
        />
        <Image
          source={Circle}
          style={styles.circle}
        />
        <Text style={styles.description}>
            Place Stethoscope at Location Indicated by Red Circle
        </Text> 
        {(!isVisible) ?
        <Text>Finish recording before going to next page!</Text>
        :
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HeartRecordStep2');
            console.log('You tapped the button!');
          }}
          style={styles.customButton}
        >
        <Text style={styles.buttonText}>Next Measurement</Text>
        </TouchableOpacity>
        }
        
        {/* <RecordingButton
          onPress={()=>{setRecordingStatus('recording')}}
          prop={recordingStatus}
          
        ></RecordingButton> */}
        <RecordingButton
          recording_type = {1}
          session_id = {sessionId}
        />
      </View>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white', // Change the background color as needed
  },
  title: {
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    color: '#C42021',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -100,
  },
  description: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Thin',
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop: 125,
    marginBottom: -150,
    color: '#C42021',
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: '#9fc5e8',
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 20,
    padding: 10,
    width: 150,
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 230,
    marginTop: 160,
    marginBottom: -150,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
  circle: {
    position: 'relative',
    left: -25,
    bottom: 19,
    padding: 15, //change the diameter of the red circle
    width: 30,
    height: 30,
    marginTop: 7,
  }
});

export default HeartRecordStep1;