import Button from "@ant-design/react-native/lib/button";
import { Card, WingBlank } from "@ant-design/react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Alert,
} from "react-native";
import subjectAPI from "../../../apis/subject.api";
import { useDispatch, useSelector } from "react-redux";
import {
  saveListSubjectInterest,
  saveSubjectIdTouched,
} from "../../../redux/actions/subject";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import authAPI from "../../../apis/auth.api";
import { saveSignedInUser } from "../../../redux/actions/auth";

const InterestScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  const { listSubjectInterest } = useSelector((state) => state.subjectReducer);

  useEffect(() => {
    const getData = async () => {
      if (currentUser != null) {
        const interestTopic = JSON.parse(currentUser.interestTopic);
        const data = await subjectAPI.getInterestSubject(
          { listTopicId: interestTopic },
          accessToken
        );
        if (data.listData) {
          //   console.log(data.listData);
          dispatch(saveListSubjectInterest(data.listData));
        }
      }
    };
    getData();
  }, [currentUser]);
  const dispatch = useDispatch();

  const checkPublicAccessSubject = async (subjectId) => {
    try {
      const response = await subjectAPI.checkPublic({ subjectId: subjectId }, accessToken)
      return response
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

  const showConfirmDialog = (subjectId, showMessage) => {
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
      <View size="sm" style={styles.eachTopic}>
        {item.listSubjects.length > 0 && (
          <View key={item.topicDetail.topicId} style={styles.item}>
            <View>
              {item.listSubjects.length > 0 && (
                <View style={styles.containerSubject}>
                  <Text style={styles.subjectTitle}>
                    {item.topicDetail.topicName}
                  </Text>
                </View>
              )}
              {item.listSubjects &&
                item.listSubjects.map((subject, index) => (
                  <TouchableOpacity
                    key={subject.subjectId}
                    onPress={async (item) => {
                      const response = await checkPublicAccessSubject(subject.subjectId)
                      if (response.status === 'Success') {
                        dispatch(saveSubjectIdTouched(subject));
                        navigation.navigate("Lession");
                      } else {
                        showConfirmDialog(subject.subjectId, response.message)
                      }

                    }}
                    style={styles.touchSubject}
                  >
                    <Card style={styles.card}>
                      <Card.Header
                        title={<Text style={styles.subjectName}>{subject.subjectName}</Text>}
                        thumbStyle={{ width: 30, height: 30 }}
                        // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<Text style={styles.joinStatus} > <Ionicons name='play-forward-circle' />
                          Status:<Text style={subject.joinStatus === 'Join' ? styles.greenStatus : styles.blackStatus}> {subject.joinStatus}</Text> </Text>}
                      />
                      <Card.Body>
                        <View style={{ minHeight: 20 }}>
                          <Text style={{ marginLeft: 16 }}>
                            {subject.subjectDescription}
                          </Text>
                          <Text style={{ marginLeft: 16, color: "black", marginTop: 10 }}>
                            <Ionicons name='person' /> {subject.author}
                          </Text>
                          <Text style={{ marginLeft: 16, color: "black" }}>
                            <Ionicons name='mail' /> {subject.accountId}
                          </Text>
                        </View>
                      </Card.Body>
                      <Card.Footer
                        content={<Text style={{ fontWeight: 'bold', marginLeft: 2 }}><Ionicons name='open' /> Point: {subject.point_require}</Text>}
                        extra={<Text style={styles.footerExtra}>  <Ionicons name='paper-plane' /> Learn now</Text>}
                      />
                    </Card>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
        <View>

        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {listSubjectInterest && (
        <FlatList
          data={listSubjectInterest.filter(item => item.listSubjects.length > 0)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};
export default InterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3c3c3",
  },
  eachTopic: {
    backgroundColor: "#fff",
    paddingBottom: 25,
    borderRadius: 20,
    marginTop: 8,

  },
  subjectTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerSubject: {
    height: 30,
    paddingTop: 5

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
  }
});
