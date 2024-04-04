import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogInButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.logInButton}>
      <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Log In')}>          
          <Text style={styles.text}> Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logInButton: {
    position: 'absolute',
    top: 350,
    right: 145,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#9fc5e8',
    width: 100,
    height: 53,
    alignContent: 'center',
  },
  text: {
    fontSize: 23,
    color: 'black',
    fontWeight: '700',
  }
})

export default LogInButton;