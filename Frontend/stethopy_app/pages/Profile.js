import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../components/BottomTabNavigator';

const ProfilePage = () => {
  const [isPersonalInfoCollapsed, setIsPersonalInfoCollapsed] = useState(true);
  const [isMedicalInfoCollapsed, setIsMedicalInfoCollapsed] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation();
  const [userPhoto, setUserPhoto] = useState(null);
  const [editableFields, setEditableFields] = useState({
    name: 'User\'s Name',
    dateOfBirth: 'January 1, 1990',
    phoneNumber: '123-456-7890',
    email: 'user@example.com',
    address: '123 Street, City, Country',
    sex: 'Male',
    weight: '70 kg',
    height: '180 cm',
    bloodType: 'A+',
    preexistingConditions: 'None',
  });

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Permission to access photos is required!');
    return;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      console.log('Selected image URI:', result.assets[0].uri);
      setUserPhoto(result.assets[0].uri);
    } else {
      console.log('Image selection cancelled');
      // Handle the case when the image selection is canceled after permission is granted
      // You can add your custom logic or inform the user about the canceled selection.
    }
  } catch (error) {
    console.log('ImagePicker Error:', error);
    // Handle error from ImagePicker (e.g., display an error message to the user)
  }
  };

  const handleEditInformation = () => {
    setIsEditMode(true);
    setIsPersonalInfoCollapsed(false);
    setIsMedicalInfoCollapsed(false);
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    setIsPersonalInfoCollapsed(true);
    setIsMedicalInfoCollapsed(true);
  };

  const renderEditableFields = (key, title) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <TextInput
        style={styles.editableInput}
        value={editableFields[key]}
        onChangeText={(text) =>
          setEditableFields((prevFields) => ({
            ...prevFields,
            [key]: text,
          }))
        }
        placeholder={`Enter ${title}`}
        placeholderTextColor="grey"
        editable={isEditMode}
        multiline={key === 'address' || key === 'preexistingConditions'}
        numberOfLines={3}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BottomTabNavigator></BottomTabNavigator>
      <TouchableOpacity onPress={selectImage}>
        <View style={styles.profileImage}>
         {userPhoto ? (
            <Image source={{ uri: userPhoto }} style={styles.profileImage} />
          ) : (
            <Text style={styles.uploadText}>Add Photo</Text>
          )}
        </View>
      </TouchableOpacity>

      <Text style={styles.userName}>User's Name</Text>
      <Text style={styles.patientID}>Patient ID: #123456</Text>

      <TouchableOpacity
        onPress={() => setIsPersonalInfoCollapsed(!isPersonalInfoCollapsed)}
        style={styles.collapseButton}
      >
        <Text>Personal Information</Text>
      </TouchableOpacity>
      {!isPersonalInfoCollapsed && (
        <View style={styles.infoContainer}>
          {renderEditableFields('name', 'Name')}
          {renderEditableFields('dateOfBirth', 'Date of Birth')}
          {renderEditableFields('phoneNumber', 'Phone Number')}
          {renderEditableFields('email', 'Email')}
          {renderEditableFields('address', 'Address')}
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsMedicalInfoCollapsed(!isMedicalInfoCollapsed)}
        style={styles.collapseButton}
      >
        <Text>Medical Information</Text>
      </TouchableOpacity>
      {!isMedicalInfoCollapsed && (
        <View style={styles.infoContainer}>
          {renderEditableFields('sex', 'Sex')}
          {renderEditableFields('weight', 'Weight')}
          {renderEditableFields('height', 'Height')}
          {renderEditableFields('bloodType', 'Blood Type')}
          {renderEditableFields('preexistingConditions', 'Preexisting Conditions')}
        </View>
      )}

      {isEditMode && (
        <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleEditInformation} style={styles.editButton}>
        <Text>Edit Information</Text>
      </TouchableOpacity>
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  patientID: {
    fontSize: 16,
    marginTop: 5,
  },
  collapseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
    padding: 10,
    width: 250,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldTitle: {
    fontWeight: 'bold',
  },
  editableInput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 8,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 8,
  },
});

export default ProfilePage;
