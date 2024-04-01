import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SignUpPage = () => {
  const [userType, setUserType] = useState('patient'); // Default to patient
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setUserType('patient')}
        >
          <Text>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setUserType('doctor')}
        >
          <Text>Doctor</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Name" style={styles.input} />
      {userType === 'doctor' && (
        <>
          <TextInput placeholder="Specialization" style={styles.input} />
          <TextInput placeholder="Biography" style={styles.input} multiline />
          <TextInput placeholder="Education" style={styles.input} />
          <TextInput placeholder="Years of Experience" style={styles.input} keyboardType="numeric" />
        </>
      )}
      {userType === 'patient' && (
        <>
          <TextInput placeholder="Gender" style={styles.input} />
          <TextInput placeholder="Date of Birth" style={styles.input} />
          <TextInput placeholder="Pre-existing Conditions" style={styles.input} multiline />
          <TextInput placeholder="Blood Type" style={styles.input} />
          <TextInput placeholder="Weight" style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Height" style={styles.input} keyboardType="numeric" />
        </>
      )}
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Sign Up" onPress={() => console.log('Handle sign up...')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioBtn: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
});

export default SignUpPage;
