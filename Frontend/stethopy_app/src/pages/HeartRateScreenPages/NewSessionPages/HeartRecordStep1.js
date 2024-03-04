import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BottomTabNavigator from '../../../components/BottomTabNavigator';
import RecordPageImage from '../../../components/images/RecordPage1Image.jpg'
import Circle from '../../../components/images/Red_circle.svg.png'
//import { fetchData } from './ListeningSessions/RecordButtonPress';
//import { FontAwesome } from '@expo/vector-icons';
//import ListeningSessions from './ListeningSessions';

const HeartRecordStep1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          1st Measurement: Right heart
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
        
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HeartRecordStep2');
            console.log('You tapped the button!');
          }}
          style={styles.customButton}
        >
          <Text style={styles.buttonText}>Heart Record Step 2</Text>
        </TouchableOpacity>
        
        
        <BottomTabNavigator></BottomTabNavigator>
      </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'hsla(215, 100%, 60%, 1)', // Change the background color as needed
  },
  title: {
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: -100,
  },
  description: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Thin',
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop: 125,
    marginBottom: -150,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: 'white', // Change button background color
    padding: 15,
    borderRadius: 50, // Adjust border radius for rounded corners
    marginTop: 250,
    marginBottom: 250,
    width: 200,
    height: 50,
  },
  recordButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    marginTop: 160,
    marginBottom: -175,
    width: 200,
    height: 50,
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
  buttonText: {
    color: 'black', // Change text color
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 200,
    marginTop: 175,
    marginBottom: -150,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
  circle: {
    position: 'relative',
    left: -22,
    padding: 15, //change the diameter of the red circle
    width: 30,
    height: 30,
    marginTop: 7,
  }
});

export default HeartRecordStep1;