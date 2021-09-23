
import Button from '@ant-design/react-native/lib/button';
import { Card, WingBlank } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import subjectAPI from '../../../apis/subject.api';
import { useDispatch, useSelector } from 'react-redux';
import { saveListSubjectInterest } from '../../../redux/actions/subject';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import lessionAPI from '../../../apis/lession.api'
import { saveListLessionFoundBySubjectId, saveTouchedLession } from '../../../redux/actions/lession';
import { Ionicons } from '@expo/vector-icons';
import flashcardAPI from '../../../apis/flashcard.api';
import { saveTouchedFlashcard } from '../../../redux/actions/flashcard';
import Moment from "moment";


const FlashcardScreen = ({ navigation }) => {

    const { touchedSubject } = useSelector(state => state.subjectReducer);
    const { accessToken } = useSelector(state => state.authReducer);
    const { lessionTouched } = useSelector(state => state.lessionReducer);

    const [listFlashcardFound, setListFlashcardFound] = useState(null)
    const [resMessage, setResMessage] = useState('')

    const dispatch = useDispatch();

    const getListPublicFlashcardByLessionId = async () => {
        let isMounted = true;

        const response = await flashcardAPI.getFlashcardByLessionId({
            lessionId: lessionTouched.lessionId
        }, accessToken)
        if (isMounted) {
            if (response.status === "Success") {
                setListFlashcardFound(response.flashcard)
            } else {
                setResMessage(response.message)
            }
        } else {
            return isMounted = false
        }

    }
    useEffect(() => {
        getListPublicFlashcardByLessionId();
    }, [lessionTouched])

    const renderItem = ({ item }) => {
        return (
            <WingBlank size='sm' style={styles.each}>
                <TouchableOpacity
                    onPress={(e) => {
                        dispatch(saveTouchedFlashcard(item))
                        navigation.navigate("Flashcard content")
                    }}
                >
                    <Card style={styles.card} >
                        <Card.Header
                            title={<Text style={{ fontWeight: 'bold' }}>{item.flashcardName}</Text>}
                            thumbStyle={{ width: 30, height: 30 }}
                            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<Text style={styles.author}>
                                <Ionicons
                                    name="pricetag-sharp"
                                /> {"Flashcard"}</Text>}
                        />
                        <Card.Body>
                            <View style={{ minHeight: 20 }}>
                                <Text style={styles.learnNow}>Learn now <Ionicons name="brush" /></Text>
                            </View>
                        </Card.Body>
                    </Card>
                </TouchableOpacity>
            </WingBlank>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subjectTitle}>
                <Text style={styles.subjectTitleText} > <Ionicons name='book-sharp' size={35} /> {touchedSubject.subjectName}</Text>
                <Text style={styles.lessonName}><Ionicons size={16} name='folder-open' /> {lessionTouched.lessionName}</Text>
            </View>
            {lessionTouched !== null ? (
                <WingBlank style={styles.viewHeader}>
                    <View style={styles.textHeader}>
                        <Text style={styles.textInfo}>
                            <Text style={styles.headContent}>Description:</Text> {lessionTouched.lessionDescription}
                        </Text>
                        <Text style={styles.textInfo}>
                            <Text style={styles.headContent}>Created date:</Text>{" "}
                            {Moment(lessionTouched.createdDate).format("YYYY-MM-DD")}
                        </Text>
                        {/* <Text style={styles.headContent} >View Quiz: <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate("Quiz") }} >Quizzes <Ionicons size={15} name='pencil-sharp' /></Text></Text> */}
                    </View>
                </WingBlank>
            ) : null}
            {listFlashcardFound !== null ? <View style={styles.flashContainer}>
                {listFlashcardFound !== null && <FlatList
                    data={listFlashcardFound}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>List Flashcards</Text>
            </View> : <WingBlank style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>EMPTY CONTENT</Text>
                <Text style={styles.resMessage}>{resMessage}</Text>
            </WingBlank>}
        </SafeAreaView>
    );
}

export default FlashcardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4ecfa',
    },
    flashContainer: {
        backgroundColor: '#fff',
        marginTop: 5,
        paddingBottom: 5,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingTop: 10
    },
    each: {
        marginTop: 15,
    },
    learnNow: {
        textAlign: "center"
    },
    lessonName: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
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
        marginTop: -10,

    },
    subjectTitle: {
        minHeight: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderTopColor: 'grey',
        borderLeftColor: '#fff',
        borderBottomColor: "#fff",
        borderRightColor: '#fff',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    subjectTitleText: {
        color: '#000',
        lineHeight: 50,
        fontSize: 40
    },
    author: {
        marginLeft: '50%'
    },
    empty: {
        marginTop: '50%'
    },
    resMessage: {
        textAlign: 'center'
    },
    viewHeader: {
        alignItems: "center",
        marginTop: 5,
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        // borderRadius: 10,
        borderBottomStartRadius: 1,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 1,
        borderTopStartRadius: 20
    },
    textHeader: {
        justifyContent: "flex-start",
        paddingBottom: 5,
        marginLeft: 5
    },
    textInfo: {
        color: "#000",
        fontSize: 15,
    },
    headContent: {
        fontWeight: 'bold'
    },

});