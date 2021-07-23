
import Button from '@ant-design/react-native/lib/button';
import { Card, WingBlank } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, FlatList, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

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
import HTML from 'react-native-render-html';


const FlashcardContentScreen = ({ navigation }) => {

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

    return (
        <View style={styles.container}>
            <ScrollView>
                {flashcardTouched &&
                    <WingBlank size='lg' style={styles.content}  >
                        <View>
                            <Text style={styles.subjectTitle} >#{flashcardTouched.flashcardName}</Text>
                        </View>
                        <View>
                            <HTML source={{ html: flashcardTouched.flashcardContent }} imagesMaxWidth={(Dimensions.get('window').width - 100)} />
                        </View>
                    </WingBlank>}
            </ScrollView>
        </View>
    );
}

export default FlashcardContentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,147,135)'
    },
    content: {
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    subjectTitle: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
});