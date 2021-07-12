import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const ChangeInterestTopicScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Change Interest Topic screen</Text>
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            /> */}
            {/* <LogoutButton handleLogoutClick={handleLogoutClick} /> */}
        </View>
    );
}

export default ChangeInterestTopicScreen;