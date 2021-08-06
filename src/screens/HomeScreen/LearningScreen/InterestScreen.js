import Button from "@ant-design/react-native/lib/button";
import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import subjectAPI from "../../../apis/subject.api";
import { useDispatch, useSelector } from "react-redux";
import {
  saveListSubjectInterest,
  saveSubjectIdTouched,
} from "../../../redux/actions/subject";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item} >
        {item.listSubjects.length > 0 && (
          <View key={item.topicDetail.topicId} >
            <View>
              {item.listSubjects.length > 0 && (
                <TouchableOpacity
                //   style={(marginVertical = 50)}
                // onPress={(item) => {
                //   navigation.goBack();
                // }}
                >
                  <Text style={styles.topicTitle}>
                    #{item.topicDetail.topicName}
                  </Text>
                </TouchableOpacity>

              )}
              {item.listSubjects &&
                item.listSubjects.map((subject, index) => (
                  <WingBlank size="lg" key={subject.subjectId} >
                    <TouchableOpacity
                      //   style={(marginVertical = 50)}
                      onPress={(item) => {
                        dispatch(saveSubjectIdTouched(subject));
                        console.log(subject);
                        navigation.navigate("Lession");
                      }}
                    >
                      <Card style={styles.card}>
                        <Card.Header
                          title={subject.subjectName}
                          thumbStyle={{ width: 30, height: 30 }}
                          // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                          extra={<Text style={styles.author}>{"Subject"}</Text>}
                        />
                        <Card.Body>
                          <View style={{ minHeight: 20 }}>
                            <Text style={{ marginLeft: 16 }}>
                              {subject.subjectDescription}
                            </Text>
                            <Text style={{ marginLeft: 16, color: "blue" }}>
                              {subject.author}
                            </Text>
                          </View>
                        </Card.Body>
                        <Card.Footer
                          content="Public"
                          extra="Anyone can see this subject"
                        />
                      </Card>
                    </TouchableOpacity>
                  </WingBlank>
                ))}
            </View>
          </View>
        )}
      </View>
    );
  };
  console.log(listSubjectInterest)
  return (
    <ScrollView style={styles.container}>
      {listSubjectInterest && (
        <FlatList
          data={listSubjectInterest.filter(item => item.listSubjects.length > 0)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </ScrollView>
  );
};
export default InterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topicTitle: {
    backgroundColor: 'rgb(0,147,135)',
    borderBottomLeftRadius: "20%",
    borderBottomRightRadius: "20%",
    textAlign: 'center',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    marginTop: 10,
    color: "#fff",
    fontSize: 24
  },
  card: {
    backgroundColor: "rgb(221,234,255)",
    marginTop: 5,
    color: "#fff",
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#000"

  },
  item: {
    backgroundColor: 'rgba(0,147,135,0.2)',
    borderRadius: 5,
    marginTop: 5,
    paddingBottom: 5
  }


  // item: {
  //   backgroundColor: "rgba(112,193,248,0.2)",
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 18,
  //   // justifyContent: "center",
  // },
  // title: {
  //   fontSize: 32,
  // },
  // card: {
  //   marginTop: 5,
  //   marginBottom: 15,
  // },
  // subjectTitle: {
  //   color: "#fff",
  //   fontSize: 30,
  //   textAlign: "center",
  //   borderRadius: 4,
  //   padding: 4,
  // },
  // author: {
  //   marginLeft: "50%",
  // },
});
