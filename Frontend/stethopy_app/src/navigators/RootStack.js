import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from '../pages/Home';
import Profile from '../pages/Profile';
import SignInPage from '../pages/SignInPage';
//import SignUpPage from '../pages/SignUpPage';


//Heart Rate Screen pages
import HeartRateScreen from '../pages/HeartRateScreenPages/HeartRateScreen';
import ListeningSessions from '../pages/HeartRateScreenPages/NewSessionPages/ListeningSessions';
import SessionSummary from '../pages/HeartRateScreenPages/SessionSummary';
//New Session Step Pages
import HeartRecordStep1 from '../pages/HeartRateScreenPages/NewSessionPages/HeartRecordStep1';
import HeartRecordStep2 from '../pages/HeartRateScreenPages/NewSessionPages/HeartRecordStep2';
import HeartRecordStep3 from '../pages/HeartRateScreenPages/NewSessionPages/HeartRecordStep3';
import HeartRecordStep4 from '../pages/HeartRateScreenPages/NewSessionPages/HeartRecordStep4';
import NewListeningSessionLanding from '../pages/HeartRateScreenPages/NewSessionPages/NewListeningSessionLanding';
//Past Session Pages
import PastSessionListeningPage from '../pages/HeartRateScreenPages/PastSessionPages/PastSessionListeningPage';




//Root stack for main pages
const Stack = createNativeStackNavigator();


const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HeartRateScreen" component={HeartRateScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ListeningSessions" component={ListeningSessions} />
        <Stack.Screen name="SessionSummary" component={SessionSummary} />
        <Stack.Screen name="HeartRecordStep1" component={HeartRecordStep1} />
        <Stack.Screen name="HeartRecordStep2" component={HeartRecordStep2} />
        <Stack.Screen name="HeartRecordStep3" component={HeartRecordStep3} />
        <Stack.Screen name="HeartRecordStep4" component={HeartRecordStep4} />
        <Stack.Screen name="NewListeningSessionPage" component={NewListeningSessionLanding} />
        <Stack.Screen name="PastSessionListeningPage" component={PastSessionListeningPage} />
        <Stack.Screen name="Sign In" component={SignInPage} />
        {/* <Stack.Screen name="Sign Up" component={SignUpPage} /> */}
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default RootStack;