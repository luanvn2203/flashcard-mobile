import Button from "@ant-design/react-native/lib/button";
import { Card, WingBlank } from "@ant-design/react-native";
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
      <WingBlank size="sm" style={styles.container}>
        {item.listSubjects.length > 0 && (
          <View key={item.topicDetail.topicId} style={styles.item}>
            <View>
              {item.listSubjects.length > 0 && (
                <Text style={styles.subjectTitle}>
                  #{item.topicDetail.topicName}
                </Text>
              )}
              {item.listSubjects &&
                item.listSubjects.map((subject, index) => (
                  <WingBlank size="lg" key={subject.subjectId}>
                    <TouchableOpacity
                      //   style={(marginVertical = 50)}
                      onPress={(item) => {
                        dispatch(saveSubjectIdTouched(subject));
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
      </WingBlank>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading ? <Text>Loading. . .</Text> : */}
      {listSubjectInterest && (
        <FlatList
          data={listSubjectInterest}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {/* } */}
    </SafeAreaView>
  );
};
export default InterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  item: {
    backgroundColor: "rgba(112,193,248,0.2)",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 18,
    // justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
  card: {
    marginTop: 5,
    marginBottom: 15,
  },
  subjectTitle: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    borderRadius: 4, padding: 4
  },
  author: {
    marginLeft: "50%",
  },
});
