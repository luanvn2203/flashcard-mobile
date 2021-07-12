import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Button
} from 'react-native';



LogoutButton.propTypes = {
    handleLogoutClick: PropTypes.func,
};
LogoutButton.defaultProps = {
    handleLogoutClick: null,
};


function LogoutButton(props) {
    const { handleLogoutClick } = props
    return (
        <TouchableOpacity
            onPress={handleLogoutClick}
            style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
            }]}
        >
            <Text style={[styles.textSign, {
                color: '#009387'
            }]}>Logout</Text>
        </TouchableOpacity>
    );
}

export default LogoutButton;

const styles = StyleSheet.create({
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});