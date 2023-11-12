import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

function HeartRateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Thin', fontWeight: 'bold', color: 'black' }}>
        WAVE FILE
      </Text>
      <Button
        mode="contained"
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}
      />
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
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
  },
  button: {
    width: '90%', // Adjust the width as needed
    marginTop: 20, // Adjust the margin as needed
  },
});


export default HeartRateScreen;