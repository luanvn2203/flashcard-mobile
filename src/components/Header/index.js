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
    Button,
    Action
} from 'react-native';



MainHeader.propTypes = {
    handleLogoutClick: PropTypes.func,
};
MainHeader.defaultProps = {
    handleLogoutClick: null,
};


function MainHeader(props) {
    const { handleLogoutClick } = props
    return (
        <View style={styles.headerContainer}>


        </View>
    );
}

export default MainHeader;

const styles = StyleSheet.create({
    headerContainer: {
        height: 40,
        backgroundColor: 'red'
    }
});