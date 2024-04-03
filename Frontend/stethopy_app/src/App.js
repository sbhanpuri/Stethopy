import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import RootStack from './navigators/RootStack'; // Adjust the path accordingly
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
  );
}