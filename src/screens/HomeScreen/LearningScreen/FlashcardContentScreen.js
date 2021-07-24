
import { WingBlank } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import questionAPI from '../../../apis/question.api';


const FlashcardContentScreen = ({ navigation }) => {
    const window = useWindowDimensions();

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