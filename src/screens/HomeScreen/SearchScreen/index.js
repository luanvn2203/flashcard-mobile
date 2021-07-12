import React, { useCallback, useEffect, useState } from 'react';
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
    FlatList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, WingBlank } from '@ant-design/react-native'

import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingState, saveAccessToken, saveSignedInUser } from '../../../redux/actions/auth';
import subjectAPI from '../../../apis/subject.api';
import { saveSubjectIdTouched } from '../../../redux/actions/subject';


function SearchScreen({ navigation }) {
    const dispatch = useDispatch()
    const { accessToken } = useSelector(state => state.authReducer);
    const { currentUser } = useSelector(state => state.authReducer);
    const { colors } = useTheme();

    const [searchValue, setSearchValue] = useState(null);
    const [searchResult, setSearchResult] = useState(null)

    const searchSubject = async (value) => {
        console.log(value)
        try {
            setSearchValue(value)
            const response = await subjectAPI.searchSubjectByNameAndDes({ searchValue: value }, accessToken)
            console.log(response)
            if (response.status === "Success") {
                setSearchResult({
                    result: response.searchResult,
                    total: response.total_subject
                })
            } else {
                setSearchResult(null)
                setSearchValue(null)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const debounceDropDown = useCallback(debounce((nextValue) => searchSubject(nextValue), 1000), [])

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            debounceDropDown(val)
        }
    }
    const handleValidValue = (val) => {
        //set state
    }
    const renderItem = ({ item }) => {
        return (

            <View style={styles.itemResult}>

                <TouchableOpacity
                    onPress={(subject) => {
                        dispatch(saveSubjectIdTouched(item))
                        navigation.navigate("Lession")
                    }}
                >
                    <Card style={styles.card} >
                        <Card.Header
                            title={item.subjectName}
                            thumbStyle={{ width: 30, height: 30 }}
                            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<Text style={styles.author}>{'Subject'}</Text>}
                        />
                        <Card.Body>
                            <View style={{ minHeight: 20 }}>
                                <Text style={{ marginLeft: 16 }}>{item.subjectDescription}</Text>
                                <Text style={{ marginLeft: 16, color: 'blue' }}>{item.author}</Text>

                            </View>
                        </Card.Body>
                        <Card.Footer
                            content='Public'
                            extra="Anyone can see this subject"
                        />
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ height: '100%', backgroundColor: '#169d9e' }}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={{ marginTop: 10 }}>
                {searchResult !== null && <FlatList
                    data={searchResult.result}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                {searchResult === null && <Text>Input something for searching . . .</Text>}
            </View>
            <View style={styles.action}>

                <TextInput

                    keyboardType="email-address"
                    autoCompleteType="email"
                    placeholder="Input search value . . . "
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000000'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) => handleValidValue(e.nativeEvent.text)}
                />
                {/* <FontAwesome
                    style={styles.iconSearch}
                    name="search"
                    size={30}
                    color='#fff'
                /> */}
            </View>

        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'

    },
    item: {
        backgroundColor: 'rgba(112,193,248,0.2)',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 18
    },
    title: {
        fontSize: 32,
    },
    card: {
        marginTop: 10
    },
    subjectTitle: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },
    author: {
        marginLeft: '50%'
    },
    action: {
        flexDirection: 'row',
        position: 'absolute',
        top: '90%',
        width: '100%',
        zIndex: 1000,
    },
    textInput: {
        paddingLeft: 10,
        padding: 8,
        color: '#05375a',
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
    },
    // iconSearch: {
    //     marginBottom: -10
    // },


});