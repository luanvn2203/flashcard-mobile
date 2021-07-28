import { WingBlank, Button, WhiteSpace } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import privateLessionAPI from '../../../apis/private.lession.api';
import privateSubjectAPI from '../../../apis/private.subject.api';

const RequestScreen = ({ navigation }) => {
    const { accessToken } = useSelector((state) => state.authReducer);

    // const [subjectRequest, setSubjectRequest] = useState(null)
    // const [lessionRequest, setLessionRequest] = useState(null)
    const [waitingSubjectRequest, setWaitingSubjectRequest] = useState(null)
    const [waitingLessionRequest, setWaitingLessionRequest] = useState(null)

    const getRequestSubjectToMe = async () => {
        const isMounted = true
        const response = await privateSubjectAPI.requestToMe(accessToken)
        if (response.status === "Success") {
            const waitingRequest = response.listRequest.filter(item => item.statusId === 1)
            if (isMounted) {
                // setSubjectRequest(response.listRequest)
                setWaitingSubjectRequest(waitingRequest)
            } else {
                return (isMounted = false);
            }
        }
    }
    const getRequestLessionToMe = async () => {
        const isMounted = true
        const response = await privateLessionAPI.requestToMe(accessToken)
        if (response.status === "Success") {
            const waitingRequest = response.listRequest.filter(item => item.statusId === 1)
            if (isMounted) {
                // setLessionRequest(response.listRequest)
                setWaitingLessionRequest(waitingRequest)
            } else {
                return (isMounted = false);
            }
        }
    }

    useEffect(() => {
        getRequestSubjectToMe()
        getRequestLessionToMe()
    }, [])
    return (
        <ScrollView style={styles.container} >
            <View style={styles.eachRequestType}>
                <Text style={styles.requestTitle}>Request subject
                    <Text style={styles.newRequest}> +{waitingSubjectRequest !== null &&
                        waitingSubjectRequest.length} new  </Text>
                </Text>

                {waitingSubjectRequest !== null ?
                    waitingSubjectRequest.map((subRequest, subIndex) => {
                        return (
                            <WingBlank size='md' key={subIndex} style={styles.earchRequest}>
                                <View >
                                    <Text style={styles.requestText} >{subRequest.requestFrom} request to view subject "{subRequest.name}"   </Text>
                                    <View style={styles.buttons}>
                                        <Button size="small"
                                        >Approve</Button>
                                        <Button size="small"
                                            style={{
                                                backgroundColor: '#C7C7C7',
                                                marginLeft: 4

                                            }}
                                        >Denine</Button>
                                    </View>
                                </View>
                            </WingBlank>
                        )
                    }) : <Text>No request now</Text>
                }
                <Button style={styles.buttonHistory} size="large">View History</Button>
            </View>
            <View style={styles.eachRequestType}>
                <Text style={styles.requestTitle} >Request lession
                    <Text style={styles.newRequest}> +{waitingLessionRequest !== null
                        && waitingLessionRequest.length} new   </Text></Text>
                {waitingLessionRequest !== null ?
                    waitingLessionRequest.map((lesRequest, subIndex) => {
                        return (
                            <WingBlank size='md' key={subIndex} style={styles.earchRequest}>
                                <View onPress={() => console.log(lesRequest)}>
                                    <Text style={styles.requestText} >{lesRequest.requestFrom} request to view subject "{lesRequest.name}"   </Text>
                                    <View style={styles.buttons}>
                                        <Button size="small"
                                        >Approve</Button>
                                        <Button size="small"
                                            style={{
                                                backgroundColor: '#C7C7C7',
                                                marginLeft: 4
                                            }}
                                        >Denine</Button>
                                    </View>
                                </View>
                            </WingBlank>
                        )
                    }) : <Text>No request now</Text>
                }
                <Button style={styles.buttonHistory} size="large">View History</Button>
            </View>
        </ScrollView>
    );
}

export default RequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    requestTitle: {
        fontSize: 25,
        color: 'rgb(255,255,255)'
    },
    earchRequest: {
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 4,
        padding: 3,
        marginTop: 4
    },
    requestText: {
        color: 'rgb(0,0,0)'
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: '68%'
    },
    eachRequestType: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginTop: 10,
        borderRadius: 5
    },
    newRequest: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonHistory: {
        backgroundColor: 'rgba(0,139,139,0.4)'
    }
});
