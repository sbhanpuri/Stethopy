import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import BottomTabNavigator from '../../../components/BottomTabNavigator';;

const PastSessionListeningPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontFamily: 'HelveticaNeue-Thin', fontWeight: 'bold', color: 'black' }}>
        PastSessionListeningPage
      </Text>

      <img src="Frontend/heartcageImage.heic" alt="React Image" />

      <BottomTabNavigator></BottomTabNavigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(199, 100%, 75%, 1)', // Change the background color as needed
  },
  title: {
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
});

export default PastSessionListeningPage;