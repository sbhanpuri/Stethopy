import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import OpeningHeart from '../components/images/OpeningHeartBanner2.png'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>
          Stethopy
        </Text>
      <Image 
          source={OpeningHeart}
          style={styles.image}
        />
      <BottomTabNavigator></BottomTabNavigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change the background color as needed
  },
  title: {
    fontSize: 50, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    color: '#C42021',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -100,
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
  image: {
    width: 500,
    height: 230,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
    top: -200,
  },
});

export default HomeScreen;