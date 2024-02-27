import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import BottomTabNavigator from '../../../components/BottomTabNavigator';

const HeartRecordStep2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontFamily: 'HelveticaNeue-Thin', fontWeight: 'bold', color: 'black' }}>
        Heart Record Step 2
      </Text>


      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HeartRecordStep3');
          console.log('You tapped the button!');
        }}
        style={styles.customButton}
      >
        <Text style={styles.buttonLabel}>Heart Record Step 3</Text>
      </TouchableOpacity>
      
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
  customButton: {
    backgroundColor: 'white', // Change button background color
    padding: 15,
    borderRadius: 10, // Adjust border radius for rounded corners
    marginTop: 20,
    width: 200,
    height: 50,
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
});

export default HeartRecordStep2;