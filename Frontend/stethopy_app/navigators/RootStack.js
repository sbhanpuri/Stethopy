import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import WelcomeScreen from '../pages/Welcome';
import HeartRateScreen from '../pages/HeartRateScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HeartRateScreen" component={HeartRateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;