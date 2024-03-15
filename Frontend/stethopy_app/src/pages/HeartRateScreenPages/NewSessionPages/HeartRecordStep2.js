import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BottomTabNavigator from '../../../components/BottomTabNavigator';
import RecordPageImage from '../../../components/images/RecordPage1Image.jpg';
import Circle from '../../../components/images/Red_circle.svg.png';

const HeartRecordStep2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>
      Measurement 2: Left Heart
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
        navigation.navigate('HeartRecordStep3');
        console.log('You tapped the button!');
      }}
      style={styles.customButton}
    >
    <Text style={styles.buttonText}>Next Measurement</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HeartRecordStep1');
        console.log('You tapped the button!');
      }}
      style={styles.customButton2}
    >
    <Text style={styles.buttonText}>Previous Measurement</Text>
    </TouchableOpacity>
      
      {/* <BottomTabNavigator></BottomTabNavigator> */}
      
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
    backgroundColor: '#009FB7',
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 20,
    padding: 10,
    width: 150,
  },
  customButton2: {
    backgroundColor: '#009FB7',
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    left: 20,
    padding: 10,
    width: 150,
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
    left: 33,
    bottom: 19,
    padding: 15, //change the diameter of the red circle
    width: 30,
    height: 30,
    marginTop: 7,
  }
});

export default HeartRecordStep2;