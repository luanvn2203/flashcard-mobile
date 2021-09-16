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
import authAPI from '../../../apis/auth.api';


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
            setSearchValue(val)
        }
    }
    const handleValidValue = (val) => {
        //set state
    }

    const showConfirmDialog = (subjectId) => {
        return Alert.alert(
            "This subject is private by author !",
            "Do you want to use 10 point to request for seeing this subject content ?",
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        // send request subject
                        const response = await privateSubjectAPI.requestSubject({ subjectId: subjectId }, accessToken)
                        if (response) {
                            showToastWithGravityAndOffset(response.message)
                        }
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };
    const checkPublicAccessSubject = async (subjectId) => {
        try {
            const response = await subjectAPI.checkPublic({ subjectId: subjectId }, accessToken)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    const showConfirmDialogPublic = (subjectId, showMessage) => {
        return Alert.alert(
            "You have not join this subject before!",
            showMessage,
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        // send request subject
                        const response = await subjectAPI.saveRelation({ subjectId: subjectId }, accessToken)
                        if (response.status === "Success") {
                            showToastWithGravityAndOffset("Join subject successfully, you can learning now")
                            searchSubject(searchValue)
                            const myInfo = await authAPI.getMe(accessToken);
                            dispatch(saveSignedInUser(myInfo.account));
                        } else {
                            showToastWithGravityAndOffset(response.message)
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
                    onPress={item.statusId === 1 ? async () => {
                        const response = await checkPublicAccessSubject(item.subjectId)
                        if (response.status === 'Success') {
                            dispatch(saveSubjectIdTouched(item))
                            navigation.navigate("Lession")
                        } else {
                            showConfirmDialogPublic(item.subjectId, response.message)
                        }

                    } : async () => {
                        console.log(item)
                        const response = await checkAcceptAPI.checkAcceptSubject({ subjectId: item.subjectId }, accessToken)
                        console.log(response)
                        if (response.status === "Success") {
                            dispatch(saveSubjectIdTouched(item))
                            navigation.navigate("Lession")
                        } else if (response.status === "Not Found Request") {
                            showConfirmDialog(item.subjectId)
                        }
                    }}
                >
                    <Card style={styles.card}>
                        <Card.Header
                            title={<Text style={styles.subjectName}>{item.subjectName}</Text>}
                            thumbStyle={{ width: 30, height: 30 }}
                            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<Text style={styles.joinStatus} > <Ionicons name='play-forward-circle' />
                                Status:<Text style={item.joinStatus === 'Join' ? styles.greenStatus : styles.blackStatus}> {item.joinStatus}</Text> </Text>}
                        />
                        <Card.Body>
                            <View style={{ minHeight: 20 }}>
                                <Text style={{ marginLeft: 16 }}>
                                    {item.subjectDescription}
                                </Text>
                                <Text style={{ marginLeft: 16, color: "black", marginTop: 10 }}>
                                    <Ionicons name='person' /> {item.author}
                                </Text>
                                <Text style={{ marginLeft: 16, color: "black" }}>
                                    <Ionicons name='mail' /> {item.accountId}
                                </Text>
                            </View>
                        </Card.Body>
                        <Card.Footer
                            content={<Text style={{ fontWeight: 'bold', marginLeft: 2 }}><Ionicons name='open' /> Point: {item.point_require}</Text>}
                            extra={<Text style={styles.footerExtra}>  <Ionicons name='paper-plane' /> Learn now</Text>}
                        />
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ height: '100%', backgroundColor: '#e4ecfa' }}>
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
                    placeholder="What are you looking for? "
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
                {searchResult !== null &&
                    <FlatList
                        data={searchResult.result}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                {searchResult === null && searchValue !== null
                    && <View>
                        <Text style={styles.emptyText}>Opps, Not found subject with your keywords</Text>
                        <Ionicons name='document' size={300} style={styles.iconEmpty} />
                    </View>}
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
        backgroundColor: '#e4ecfa'

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
        color: 'grey',
        fontSize: 19,
    },
    subjectName: {
        fontWeight: 'bold',
        fontSize: 15
    },
    joinStatus: {
        marginLeft: 40
    },
    subjectName: {
        fontWeight: 'bold',
        fontSize: 15
    },
    touchSubject: {
        margin: 4,
        borderTopColor: '#a4acba',
        borderBottomColor: '#fff',
        borderLeftColor: '#a4acba',
        borderRightColor: '#fff',
        borderWidth: 2,
        borderRadius: 7,
        paddingLeft: 1
    },
    footerExtra: {
        marginLeft: 40,
        fontWeight: 'bold'
    },
    greenStatus: {
        color: 'green',
        fontWeight: 'bold',
        backgroundColor: "rgba(228,236,250,0.7)",
        fontSize: 15
    },
    blackStatus: {
        color: 'black',
        fontWeight: 'bold', backgroundColor: "rgba(228,236,250,0.7)",
        fontSize: 15
    },
    card: {
        marginTop: 3
    },
    iconEmpty: {
        color: "#fff",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: "gray"
    }


});