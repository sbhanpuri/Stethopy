import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

const BottomTabNavigator = () => {
    const navigation = useNavigation()
    return (
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={24} color="black" />            
            <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('HeartRateScreen')}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color="black" />
            <Text style={styles.text}>Heart Rate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.verticalContainer} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account" size={24} color="black" />
            <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        
        
      </View>
    );
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flex: 3,
        flexDirection: 'row',

        padding: 20,
        columnGap: 20,
        alignItems: "center",
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 20,
        borderRadius: 50
    },
    verticalContainer: {
        alignItems: "center"
    },
    text: {
        fontSize: 10
    }
    
})
export default BottomTabNavigator;