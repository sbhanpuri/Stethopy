import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [isEditing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Username: 'JohnDoe',
    Age: 30,
    Dob: '01/01/1993',
    Sex: 'Male',
    Height: '5\'10"',
    Weight: '160 lbs',
    BloodType: 'A+',
    Conditions: 'None',
    //profileImage: null,
  });

  const saveUserInfo = (updatedInfo) => {
    console.log('Updating user information:', updatedInfo);
    setEditing(false);
    setUserInfo(updatedInfo);
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access photos is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log('Selected image:', result.uri);
      setUserInfo({ ...userInfo, profileImage: result.uri });
    }
  };

  const renderEditableField = (label, value, key) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            placeholder={label}
            value={value}
            onChangeText={(text) => setUserInfo({ ...userInfo, [key]: text })}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.addPhotoButton} onPress={selectImage}>
          {userInfo.profileImage ? (
            <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.uploadButtonCircle}>
              <Text style={styles.uploadText}>Add a Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Button
        title={isEditing ? 'Save' : 'Edit'}
        onPress={() => {
          if (isEditing) {
            saveUserInfo(userInfo);
          }
          setEditing(!isEditing);
        }}
      />
      <View style={styles.userInfoContainer}>
        {Object.entries(userInfo).map(([key, value]) => (
          <View key={key} style={styles.userInfoItem}>
            {renderEditableField(key, value, key)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: 'white',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 18,
  },
  fieldValue: {
    flex: 3,
    fontSize: 18,
  },
  input: {
    flex: 3,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  userInfoContainer: {
    width: '100%',
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfileScreen;
