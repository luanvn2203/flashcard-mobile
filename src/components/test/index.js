import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

TestComponent.propTypes = {

};

function TestComponent(props) {
    const { books, bookmarks } = useSelector(state => state.booksReducer);
    const { accessToken } = useSelector(state => state.authReducer);

    const dispatch = useDispatch()

    const handleButtonClick = () => {
        dispatch({
            type: 'SET_BOOKS',
            payload: {
                books: ['2', '3asd'],
                bookmarks: ['123123123123123']
            }
        })
    }
    return (
        <View style={styles.container}>
            <Button onPress={handleButtonClick} >Open up App.js to start working on your app!</Button>
            <StatusBar style="auto" />
            {accessToken && <Text>{accessToken}</Text>}
            {books && books.map(item => <Text>{item}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default TestComponent;