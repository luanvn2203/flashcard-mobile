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
    FlatList,
    ToastAndroid
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
import checkAcceptAPI from '../../../apis/check.accessibility';
import privateSubjectAPI from '../../../apis/private.subject.api';


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
            }
        } catch (error) {
            console.log(error)
        }
    }
    const showToastWithGravityAndOffset = useCallback((message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    });
    const debounceDropDown = useCallback(debounce((nextValue) => searchSubject(nextValue), 1000), [])
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            debounceDropDown(val)
        }
    }
    const handleValidValue = (val) => {
        //set state
    }

    const showConfirmDialog = (subjectId, title, content, subjectOrLession, item) => {
        return Alert.alert(
            title,
            content,
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        if (subjectOrLession === true) {
                            const response = await subjectAPI.savePublicRelation({ subjectId: subjectId }, accessToken)
                            if (response.status === "Success") {
                                showToastWithGravityAndOffset(response.message)
                                dispatch(saveSubjectIdTouched(item))
                                navigation.navigate("Lession")
                            } else {
                                showToastWithGravityAndOffset(response.message)
                            }
                        } else {
                            // send request subject
                            const response = await privateSubjectAPI.requestSubject({ subjectId: subjectId }, accessToken)
                            if (response) {
                                showToastWithGravityAndOffset(response.message)
                            }
                        }
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };


    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemResult}>
                <TouchableOpacity
                    onPress={item.statusId === 1 ? async (subject) => {
                        console.log(item)
                        const response = await subjectAPI.checkAccessPublicSubject({ subjectId: item.subjectId }, accessToken)
                        console.log(response)
                        if (response.status === "Success") {
                            dispatch(saveSubjectIdTouched(item))
                            navigation.navigate("Lession")
                        } else {
                            showConfirmDialog(item.subjectId, "Notice!", "Do you want to use 3 point to view this subject content ?", true, item)
                        }
                    } : async () => {
                        const response = await checkAcceptAPI.checkAcceptSubject({ subjectId: item.subjectId }, accessToken)
                        console.log(response)
                        if (response.status === "Success") {
                            dispatch(saveSubjectIdTouched(item))
                            navigation.navigate("Lession")
                        } else if (response.status === "Not Found Request") {
                            showConfirmDialog(item.subjectId, "This subject is private by author !", "Do you want to use 10 point to request for seeing this subject content ?", false)
                        }
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
                            content={item.statusId == 1 ? "Public" : <Text style={styles.privateContent}>Private</Text>}

                        />
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ height: '100%', backgroundColor: '#169d9e' }}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.action}>
                <FontAwesome
                    style={styles.iconSearch}
                    name="search"
                    size={30}
                    color='#fff'
                />
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

            </View>
            <View style={{ marginTop: 10 }}>
                {searchResult !== null && <FlatList
                    data={searchResult.result}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                {searchResult === null && searchValue !== null && <Text style={styles.notFoundSubject}>Not found subject with keyword:  {searchValue}</Text>}
                {searchResult === null && searchValue === null && <View style={styles.placeholderSearch}>
                    <Text style={styles.placeholderSearchText} >Type some text to search subject . . .</Text>
                    <Text style={styles.placeholderSearchText}>Example: HTML, JAVA</Text>

                </View>}
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
        textAlign: 'center',
        borderRadius: 4, padding: 4
    },
    author: {
        marginLeft: '50%'
    },
    action: {
        flexDirection: "row",
        zIndex: 1000,
        marginTop: 10
    },
    textInput: {
        paddingLeft: 10,
        padding: 8,
        color: '#05375a',
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '90%',
    },
    notFoundSubject: {
        color: '#fff',
        fontSize: 30
    },
    privateContent: {
        backgroundColor: 'rgb(143,94,255)',
        width: 50,
        borderRadius: 4,
        color: '#FFF'
    },
    iconSearch: {
        width: '10%'
    },
    placeholderSearch: {
        marginTop: "50%"
    },
    placeholderSearchText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 19,
    }


});