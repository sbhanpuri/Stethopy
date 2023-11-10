import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the App!</Text>
      <Button
        title="Go to Heart Rate Screen"
        onPress={() => navigation.navigate('HeartRateScreen')}
      />
    </View>
  );
};

export default WelcomeScreen;