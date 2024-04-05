import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogInButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logInButton}>
        <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Log In')}>          
            <Text style={styles.text}> Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInButton: {
    marginTop: 130,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#9fc5e8',
    width: 100,
    height: 53,
  },
  text: {
    fontSize: 23,
    color: 'black',
    fontWeight: '700',
  }
})

export default LogInButton;