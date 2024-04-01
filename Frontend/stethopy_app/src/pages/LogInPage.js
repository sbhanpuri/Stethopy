import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
// import StethopyLogo from '../components/images/stethopyLogo.png';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const StethopyLogo = require('../components/images/stethopyLogo.png');

  const handleSignIn = () => {
    // Placeholder for authentication logic
    Alert.alert('Sign In', `Email: ${email}, Password: ${password}`);
    
    // Here you would typically call your authentication service
    // For example, using Firebase Auth:
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     var user = userCredential.user;
    //     // Navigate to Home Screen or show success message
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // Show error message
    //     Alert.alert('Error', errorMessage);
    //   });
  };

  return (
    <View style={styles.container}>
      <Image
      source={StethopyLogo}
      style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.button}>
      <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Log In')}>          
          <Text style={styles.text}> Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 350,
    height: 100,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
    top: -75,
  },
  button: {
    position: 'absolute',
    top: 500,
    right: 145,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#9fc5e8',
    width: 100,
    height: 53,
    alignContent: 'center',
  },
  text: {
    fontSize: 23,
    color: 'black',
    fontWeight: '700',
  }
});

export default LogInPage;