import { StyleSheet, View } from 'react-native';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';

const ButtonsContainer = () => {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <LogInButton />
          <SignUpButton />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

export default ButtonsContainer;