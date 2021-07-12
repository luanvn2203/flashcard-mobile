import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const AchievementScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Achievement screen</Text>
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            /> */}
            {/* <LogoutButton handleLogoutClick={handleLogoutClick} /> */}
        </View>
    );
}

export default AchievementScreen;