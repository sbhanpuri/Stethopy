import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#10B981',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  



const WelcomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>Track your heart rate!</Text>
      {/* <Button
        title="Go to My Recipes"
        onPress={() => navigation.navigate('Recipe')}
      /> */}
      <Text></Text>
    </View>
  );
}

export default WelcomeScreen;