
import { WingBlank } from '@ant-design/react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import questionAPI from '../../../apis/question.api';
import { Ionicons } from '@expo/vector-icons';
import flashcardAPI from '../../../apis/flashcard.api';


const FlashcardContentScreen = ({ navigation }) => {
    const window = useWindowDimensions();

    const { touchedSubject } = useSelector(state => state.subjectReducer);
    const { accessToken } = useSelector(state => state.authReducer);
    const { flashcardTouched } = useSelector(state => state.flashcardReducer);

    const [listQuestionFound, setListQuestionFound] = useState(null)
    const [resMessage, setResMessage] = useState('')

    const dispatch = useDispatch();

    const getQuestionByFlashcardId = async () => {
        let isMounted = true
        const response = await questionAPI.getQuestionByFlashcardId({
            flashcardId: flashcardTouched.flashcardId
        }, accessToken)
        if (isMounted) {
            if (response.status === "Success") {
                setListQuestionFound(response.data)
            } else {
                setResMessage(response.message)
            }
        } else {
            return isMounted = false
        }

    }
    useEffect(() => {
        getQuestionByFlashcardId();
    }, [flashcardTouched])

    const showToastWithGravityAndOffset = useCallback((message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    });
    const showConfirmDialog = (showMessage) => {
        return Alert.alert(
            "Notice !",
            showMessage,
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        const response = await flashcardAPI.markAsComplete({ flashcardId: flashcardTouched.flashcardId }, accessToken)
                        if (response) {
                            showToastWithGravityAndOffset("You complete learning successfully!")
                            navigation.navigate("Flashcard")
                        }
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {flashcardTouched &&
                    <WingBlank size='lg' style={styles.content}  >
                        <View>
                            <Text style={styles.subjectTitle} >#{flashcardTouched.flashcardName}</Text>
                        </View>
                        <View style={{ backgroundColor: '#fff' }}>
                            <HTML
                                contentWidth={window.width}
                                source={{ html: flashcardTouched.flashcardContent }}
                                tagsStyles={{
                                    img: {
                                        maxWidth: (window.width - 20)
                                    }
                                }}
                            />
                        </View>
                        <View >
                            <TouchableOpacity
                                style={styles.touchMark}
                                onPress={async (e) => {
                                    //complete learning
                                    await showConfirmDialog('Make sure you has already complete this flashcard ?')

                                }}
                            >
                                <Text style={styles.Mark}><Ionicons size={15} name='checkmark-circle-outline' /> Mark as complete </Text>
                            </TouchableOpacity>
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
        backgroundColor: '#e4ecfa'
    },
    Mark: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 30
    },
    touchMark: {
        height: 30,
        backgroundColor: '#A5D6A7',
        width: '45%',
        marginLeft: '55%',
        borderRadius: 8,
        marginTop: 10
    },
    content: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        paddingBottom: 20,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10
    },
    subjectTitle: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
});
