import React from 'react';
import PropTypes from 'prop-types';
// import { CirclesLoader, TextLoader } from '@react-native-community/art'
import {
    Platform,
    StyleSheet, Text, View
} from 'react-native';

LoadingScreen.propTypes = {

};
function LoadingScreen(props) {
    return (
        <View style={styles.container} >
            <Text style={styles.loadingText}>Please wait. . .</Text>
        </View>
    );
}

export default LoadingScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b4c9b',
    },
    loadingText: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        marginTop: '50%'

    }
})