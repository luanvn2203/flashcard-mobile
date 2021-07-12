
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
import questionAPI from '../../../apis/question.api';


const QuestionScreen = ({ navigation }) => {

    const { touchedSubject } = useSelector(state => state.subjectReducer);
    const { accessToken } = useSelector(state => state.authReducer);
    const { flashcardTouched } = useSelector(state => state.flashcardReducer);

    const [listQuestionFound, setListQuestionFound] = useState(null)
    const [resMessage, setResMessage] = useState('')

    const dispatch = useDispatch();

    const getQuestionByFlashcardId = async () => {
        const response = await questionAPI.getQuestionByFlashcardId({
            flashcardId: flashcardTouched.flashcardId
        }, accessToken)
        if (response.status === "Success") {
            setListQuestionFound(response.data)
        } else {
            setResMessage(response.message)
        }
    }
    useEffect(() => {
        getQuestionByFlashcardId();
    }, [flashcardTouched])
    const renderOptionItem = ({ item, index }) => {
        return (
            <WingBlank size='sm'>
                {index === 0 ? <Text style={styles.option}>{"A) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                    index === 1 ? <Text style={styles.option}>{"B) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                        index === 2 ? <Text style={styles.option}>{"C) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                            index === 3 ? <Text style={styles.option}>{"D) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                                index === 4 ? <Text style={styles.option}>{"E) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                                    index === 5 ? <Text style={styles.option}>{"F) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text> :
                                        <Text style={styles.option}>{"G) "}{item.optionContent} {item.isCorrect.data[0] === 1 ? <Ionicons size={24} color="#01c900" name="checkmark-sharp" /> : ''}</Text>}

            </WingBlank>
        )
    }
    const renderItem = ({ item }) => {
        return (
            <WingBlank size='sm' style={styles.container}>
                <Text></Text>
                <TouchableOpacity
                // onPress={(e) => {
                //     console.log(item)
                //     dispatch(saveTouchedFlashcard(item))
                //     navigation.navigate("Question")
                // }}
                >
                    <Card style={styles.card} >
                        <Card.Header
                            title={item.question.questionContent}
                            thumbStyle={{ width: 30, height: 30 }}
                            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<Text style={styles.author}>
                                <Ionicons
                                    name="pricetag-sharp"
                                />{"Question"}</Text>}
                        />
                        <Card.Body>
                            <View style={{ minHeight: 20 }}>
                                <FlatList
                                    data={item.option}
                                    renderItem={renderOptionItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                            </View>
                        </Card.Body>
                        {/* <Card.Footer
                            content='Public'
                            extra={item.question.createdDate.slice(0, 10)}
                        /> */}
                    </Card>
                </TouchableOpacity>
            </WingBlank>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subjectTitle} >#{flashcardTouched.flashcardName}</Text>
            {listQuestionFound !== null ? <FlatList
                data={listQuestionFound}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            /> : <WingBlank style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>EMPTY CONTENT</Text>
                <Text style={styles.resMessage}>{resMessage}</Text>
            </WingBlank>}
        </SafeAreaView>
    );
}

export default QuestionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(112,193,248,0.2)'

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
    },
    option: {
        fontSize: 15
    }

});