import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SignUpPage = () => {
  const [userType, setUserType] = useState('patient');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={userType === 'patient' ? styles.radioBtnSelected : styles.radioBtnNotSelected}
            onPress={() => setUserType('patient')}
          >
            <Text style={styles.radioText}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={userType === 'doctor' ? styles.radioBtnSelected : styles.radioBtnNotSelected}
            onPress={() => setUserType('doctor')}
          >
            <Text style={styles.radioText}>Doctor</Text>
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
        
        <View style={styles.imageButton}>
          <TouchableOpacity style={styles.verticalContainer} onPress={() => pickImage()}>          
            <Text style={styles.text}> Pick an image </Text>
          </TouchableOpacity>
        </View>
        {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
        <View style={styles.signUpButton}>
          <TouchableOpacity style={styles.verticalContainer} onPress={() =>  navigation.navigate('Sign Up')}>          
            <Text style={styles.text}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 500,
    top: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 150,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioBtnSelected: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#9fc5e8',
  },
  radioBtnNotSelected: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9fc5e8',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#9fc5e8',
    height: 40,
  },
  profileImage: {
    top: 30,
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  imageButton: {
    // position: 'absolute',
    // top: 370,
    // right: 145,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#9fc5e8',
    // width: 100,
    height: 53,
    alignContent: 'center',
    top: 20,
  },
  signUpButton: {
    // position: 'absolute',
    // top: 370,
    // right: 145,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#9fc5e8',
    // width: 100,
    height: 53,
    alignContent: 'center',
    top: 40,
  },
  text: {
    fontSize: 23,
    color: 'black',
    fontWeight: '700',
  },
  radioText: {
    fontSize: 14,
    fontWeight: '600', 
  }
});

export default SignUpPage;
