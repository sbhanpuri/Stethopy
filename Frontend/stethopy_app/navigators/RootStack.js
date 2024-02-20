import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from '../pages/Home';
import HeartRateScreen from '../pages/HeartRateListening/HeartRateScreen';
import Profile from '../pages/Profile';
import ListeningSessions from '../pages/HeartRateListening/ListeningSessions';

//Root stack for main pages
const Stack = createNativeStackNavigator();

// //nested stack to handle navigations from heartratescreen page
// const HeartRateStack = createNativeStackNavigator();

// const HeartRateStackActual = () => {
//   return (
//     <NavigationContainer>

//       <HeartRateStack.Navigator initialRouteName="HeartRateScreen">
//         <HeartRateStack.Screen name="ListeningSessions" component={ListeningSessions} />
//       </HeartRateStack.Navigator>
//     </NavigationContainer>
//   );
// }

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HeartRateScreen" component={HeartRateScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ListeningSessions" component={ListeningSessions} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default RootStack;