import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import BannerImage from '../../components/images/HeartAndBanner.png';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function getTime() {
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  return showTime;
}

const SessionSummary = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentTime, setCurrentTime] = useState(getTime());
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Session Date: {currentDate}
      </Text>
      <Text style={styles.subtitle}>
        {'\n'}
        Session Time: {currentTime}
      </Text>
      <Image 
        source={BannerImage}
        style={styles.image}
      />

    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HeartRateScreen');
        console.log('You tapped the button!');
      }}
      style={styles.customButton2}
    >
    <Text style={styles.buttonText}>Done</Text>
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
  subtitle: {
    fontSize: 20, // Change the font size as needed
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
    backgroundColor: 'white',
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
    right: 20,
    padding: 10,
    width: 150,
  },
  customButton2: {
    backgroundColor: '#009FB7',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
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
    height: 300,
    marginTop: 145,
    marginBottom: -150,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
  circle: {
    position: 'relative',
    left: 19,
    bottom: -37,
    padding: 15, //change the diameter of the red circle
    width: 30,
    height: 30,
    marginTop: 7,
  }
});

export default SessionSummary;