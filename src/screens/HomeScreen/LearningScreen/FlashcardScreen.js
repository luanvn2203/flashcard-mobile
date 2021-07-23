
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


const FlashcardScreen = ({ navigation }) => {

    const { touchedSubject } = useSelector(state => state.subjectReducer);
    const { accessToken } = useSelector(state => state.authReducer);
    const { lessionTouched } = useSelector(state => state.lessionReducer);

    const [listFlashcardFound, setListFlashcardFound] = useState(null)
    const [resMessage, setResMessage] = useState('')

    const dispatch = useDispatch();

    const getListPublicFlashcardByLessionId = async () => {
        const response = await flashcardAPI.getFlashcardByLessionId({
            lessionId: lessionTouched.lessionId
        }, accessToken)
        if (response.status === "Success") {
            setListFlashcardFound(response.flashcard)
        } else {
            setResMessage(response.message)
        }
    }
    useEffect(() => {
        getListPublicFlashcardByLessionId();
    }, [lessionTouched])

    const renderItem = ({ item }) => {
        return (
            <WingBlank size='sm' style={styles.container}>
                <Text></Text>
                <TouchableOpacity
                    onPress={(e) => {
                        dispatch(saveTouchedFlashcard(item))
                        navigation.navigate("Flashcard content")
                    }}
                >
                    <Card style={styles.card} >
                        <Card.Header
                            title={item.flashcardName}
                            thumbStyle={{ width: 30, height: 30 }}
                            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<Text style={styles.author}>
                                <Ionicons
                                    name="pricetag-sharp"
                                />{"Flashcard"}</Text>}
                        />
                        <Card.Body>
                            <View style={{ minHeight: 20 }}>
                                {/* <Text style={{ marginLeft: 16 }}>{item.dateOfCreate.slice(0,10)}</Text> */}
                                <Text style={{ marginLeft: 16, color: 'blue' }}>{item.author}</Text>

                            </View>
                        </Card.Body>
                        <Card.Footer
                            content='Public'
                            extra={item.dateOfCreate.slice(0, 10)}
                        />
                    </Card>
                </TouchableOpacity>
            </WingBlank>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subjectTitle} >#{lessionTouched.lessionName}</Text>
            {listFlashcardFound !== null ? <FlatList
                data={listFlashcardFound}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            /> : <WingBlank style={styles.container}>
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
        backgroundColor: 'rgb(0,147,135)'

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
        marginTop: -10
    },
    subjectTitle: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    author: {
        marginLeft: '50%'
    },
    empty: {
        marginTop: '50%'
    },
    resMessage: {
        textAlign: 'center'
    }

});