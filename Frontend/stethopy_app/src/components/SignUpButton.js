import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.signUpButton}>
      <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Sign Up')}>          
          <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    position: 'absolute',
    top: 435,
    right: 145,
    padding: 10,
    backgroundColor: '#9fc5e8',
    borderRadius: 8,
    width: 100,
    height: 53,
    alignContent: 'center',
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
}
})

export default SignUpButton;