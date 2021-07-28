import { WingBlank, Button, WhiteSpace, Modal, Provider } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import privateLessionAPI from '../../../apis/private.lession.api';
import privateSubjectAPI from '../../../apis/private.subject.api';

const RequestScreen = ({ navigation }) => {
    const { accessToken } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    // const [subjectRequest, setSubjectRequest] = useState(null)
    // const [lessionRequest, setLessionRequest] = useState(null)
    const [waitingSubjectRequest, setWaitingSubjectRequest] = useState(null)
    const [waitingLessionRequest, setWaitingLessionRequest] = useState(null)
    const [notWaitingSubjectRequest, setNotWaitingSubjectRequest] = useState(null)
    const [notWaitingLessionRequest, setNotWaitingLessionRequest] = useState(null)

    const [visible, setVisible] = useState(false)
    const [visibleLession, setVisibleLession] = useState(false)

    const getRequestSubjectToMe = async () => {
        const isMounted = true
        const response = await privateSubjectAPI.requestToMe(accessToken)
        if (response.status === "Success") {
            const waitingRequest = response.listRequest.filter(item => item.statusId === 1)
            const notWaitingRequest = response.listRequest.filter(item => item.statusId !== 1)
            if (isMounted) {
                // setSubjectRequest(response.listRequest)
                setWaitingSubjectRequest(waitingRequest)
                setNotWaitingSubjectRequest(notWaitingRequest)
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
            const notWaitingRequest = response.listRequest.filter(item => item.statusId !== 1)
            if (isMounted) {
                // setLessionRequest(response.listRequest)
                setWaitingLessionRequest(waitingRequest)
                setNotWaitingLessionRequest(notWaitingRequest)
            } else {
                return (isMounted = false);
            }
        }
    }
    const approvedSubjectRequest = async (requestId) => {
        const response = await privateSubjectAPI.approveRequest({ requestId: requestId }, accessToken)
        console.log(requestId);
        console.log(response)
        if (response.status === "Success") {
            getRequestSubjectToMe()
        }
    }
    const approvedLessionRequest = async (requestId) => {
        const response = await privateLessionAPI.approveRequest({ requestId: requestId }, accessToken)
        console.log(response)
        if (response.status === "Success") {
            getRequestLessionToMe()
        }
    }
    const denineSubjectRequest = async (requestId) => {
        const response = await privateSubjectAPI.denineRequest({ requestId: requestId }, accessToken)
        if (response.status === "Success") {
            getRequestSubjectToMe()
        }
    }
    const denineLessionRequest = async (requestId) => {
        const response = await privateLessionAPI.denineRequest({ requestId: requestId }, accessToken)
        if (response.status === "Success") {
            getRequestLessionToMe()
        }
    }

    useEffect(() => {
        getRequestSubjectToMe()
        getRequestLessionToMe()
    }, [])

    const onClose = () => {
        setVisible(false)
        setVisibleLession(false)
    };

    const footerButtons = [
        // { text: 'Cancel', onPress: () => console.log('cancel') },
        { text: 'Ok', onPress: () => console.log('ok') },
    ];
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
                                        <Button
                                            style={{
                                                backgroundColor: 'rgba(0,139,139,0.5)'
                                            }}
                                            onPress={() => approvedSubjectRequest(subRequest.id)}
                                            size="small"
                                        >Approve</Button>
                                        <Button
                                            onPress={() => denineSubjectRequest(subRequest.id)}
                                            size="small"
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
                <Button
                    onPress={() => {
                        setVisible(true)
                    }}
                    style={styles.buttonHistory}
                    size="large">View History</Button>
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
                                    <Text style={styles.requestText} >{lesRequest.requestFrom} request to view lession "{lesRequest.name}"   </Text>
                                    <View style={styles.buttons}>
                                        <Button
                                            style={{
                                                backgroundColor: 'rgba(0,139,139,0.5)'
                                            }}
                                            onPress={() => approvedLessionRequest(lesRequest.id)}
                                            size="small"
                                        >Approve</Button>
                                        <Button
                                            onPress={() => denineLessionRequest(lesRequest.id)}
                                            size="small"
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
                <Button
                    onPress={() => {
                        setVisibleLession(true)
                    }}
                    style={styles.buttonHistory}
                    size="large">View History</Button>
            </View>

            <Modal
                title="Subject request history"
                transparent
                onClose={onClose}
                maskClosable
                visible={visible}
                closable
                footer={footerButtons}
            >
                <ScrollView style={{ paddingVertical: 20 }}>
                    {notWaitingSubjectRequest ? notWaitingSubjectRequest.map((srequest, index) => {
                        let statusName = ""
                        let color = '#fff'
                        if (srequest.statusId === 3) {
                            statusName = "Denine";
                            color = 'rgb(199,199,199)'
                        } else if (srequest.statusId === 2) {
                            statusName = "Approved"
                            color = 'rgba(0,147,135,0.5)'
                        }
                        return (
                            <View key={index}>
                                <Text ><Text
                                    style={{
                                        backgroundColor: color,
                                        borderRadius: 5,
                                        fontWeight: 'bold',
                                        paddingLeft: 5,
                                        paddingRight: 5
                                    }}
                                >{statusName}</Text>
                                    - {srequest.requestFrom} to view {srequest.name}</Text>
                            </View>
                        )
                    }) : <Text>No history</Text>}
                </ScrollView>
            </Modal>
            <Modal
                title="Lession request history"
                transparent
                onClose={onClose}
                maskClosable
                visible={visibleLession}
                closable
                footer={footerButtons}
            >
                <ScrollView style={{ paddingVertical: 20 }}>
                    {notWaitingLessionRequest ? notWaitingLessionRequest.map((lrequest, index) => {
                        let statusName = ""
                        let color = '#fff'
                        if (lrequest.statusId === 3) {
                            statusName = "Denine";
                            color = 'rgb(199,199,199)'
                        } else if (lrequest.statusId === 2) {
                            statusName = "Approved"
                            color = 'rgba(0,147,135,0.5)'
                        }
                        return (
                            <View key={index}>
                                <Text ><Text
                                    style={{
                                        backgroundColor: color,
                                        borderRadius: 5,
                                        fontWeight: 'bold',
                                        paddingLeft: 5,
                                        paddingRight: 5
                                    }}
                                >{statusName}</Text>
                                    - {lrequest.requestFrom} to view {lrequest.name}</Text>
                            </View>
                        )
                    }) : <Text>No history</Text>}
                </ScrollView>
            </Modal>
        </ScrollView>
    );
}

export default () => (
    <Provider>
        <RequestScreen />
    </Provider>
);

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
        backgroundColor: 'rgba(0,139,139,0.4)',
        color: '#fff'
    }
});
