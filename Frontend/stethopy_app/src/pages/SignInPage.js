import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default SignInPage;