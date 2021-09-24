import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import submitAPI from "../../../src/apis/submit.api";
import subjectAPI from "../../../src/apis/subject.api";
import lessionAPI from "../../../src/apis/lession.api";
import { TouchableOpacity } from "react-native-gesture-handler";
import HistoryScreen from "./HistoryScreen";
import ProcessQuizScreen from "./ProcessScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { saveTouchedRequestLesson } from "../../redux/actions/lession";
import { saveSubjectIdTouched, saveTouchedRequestSubject } from "../../redux/actions/subject";
import { saveTouchedRecentLearning } from "../../redux/actions/subject";
import Feather from "react-native-vector-icons/Feather";

const HomeProcessScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);

  const [historyQuiz, setHistoryQuiz] = useState([]);
  const [recentLearning, setRecentLearning] = useState([]);
  const [requestLesson, setRequestLesson] = useState([]);
  const [requestSubject, setRequestSubject] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const resHistory = await submitAPI.getAllHistoryByMe(accessToken);
    console.log(resHistory);
    if (resHistory.status === "Success") {
      setHistoryQuiz(resHistory.listHistory);
    }

    const resRecentLearning = await subjectAPI.getRecentLearning(accessToken);
    console.log(resRecentLearning);
    if (resRecentLearning.status === "Success") {
      // console.log("success");
      setRecentLearning(resRecentLearning.recentSubject);
    }

    const resReuqestLesson = await lessionAPI.getRequestLessonSendFromMe(
      accessToken
    );
    if (resReuqestLesson.status === "Success") {
      setRequestLesson(resReuqestLesson.listRequest);
    }

    const resRequestSubject = await subjectAPI.getRequestSubjectSendFromMe(
      accessToken
    );
    if (resRequestSubject.status === "Success") {
      setRequestSubject(resRequestSubject.listRequest);
    }
  };
  useEffect(() => {
    getData();
  }, [currentUser]);
  // const HomeScreenStack = createStackNavigator();
  // <HomeScreenStack.Navigator initialRouteName="History">
  //     <HomeScreenStack.Screen name="Process" component={ProcessQuizScreen} />
  //     <HomeScreenStack.Screen name="History" component={HistoryScreen} />
  //   </HomeScreenStack.Navigator>
  // console.log("is home?");
  // console.log(requestLesson);
  // console.log(requestSubject);
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        {/* <View style={styles.header}>
          <Text>Header</Text>
        </View>
        <View style={styles.part1}>
          <Text>History</Text>
        </View> */}
        <View style={styles.part2}>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                borderBottomWidth: 0.5,
              }}
            >
              Recent Learning
            </Text>
          </View>
          <View style={{ width: "92%" }}>
            {recentLearning.length > 0 &&
              recentLearning.map((recent, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // borderWidth: 1,
                      // borderTopWidth: 1,
                      borderBottomWidth: 1,
                      marginVertical: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log(recent)
                        dispatch(saveSubjectIdTouched(recent))
                        navigation.navigate("Lession")
                        // dispatch(saveTouchedRecentLearning(recent));
                        // navigation.navigate("Recent");
                      }}
                      style={{
                        marginHorizontal: 5,
                        marginVertical: 5,
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ flex: 8 }}>
                        <View
                          style={{ flexDirection: "row", marginBottom: 10 }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                            }}
                          >
                            Subject:{" "}
                          </Text>
                          <Text
                            style={{
                              color: "black",
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            {recent.subjectName}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", marginBottom: 10 }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                            }}
                          >
                            Total Flashcard:{" "}
                          </Text>
                          <Text
                            style={{
                              color: "black",
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            {recent.totalFLashcard}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              fontSize: 14,
                            }}
                          >
                            Complete Percent:{" "}
                          </Text>
                          <Text
                            style={{
                              color: "black",
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            {recent.completePercent}
                            {"%"}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          // backgroundColor: "pink",
                          justifyContent: "center",
                        }}
                      >
                        <Feather name="chevron-right" color="black" size={30} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
        <View style={styles.part3}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              borderBottomWidth: 0.5,
              marginBottom: 5,
            }}
          >
            Request sent
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: "95%",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Request Lesson
              </Text>
            </View>
            <View>
              {requestLesson.length > 0 &&
                requestLesson.map((reqLes, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginVertical: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(saveTouchedRequestLesson(reqLes));
                          navigation.navigate("Request Lesson");
                        }}
                        style={{
                          marginHorizontal: 5,
                          marginVertical: 5,
                          flex: 1,
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ flex: 8 }}>
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                              }}
                            >
                              Subject:{" "}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              {reqLes.subjectName}
                            </Text>
                          </View>
                          {/* <Text>Subject Name: {reqLes.subjectName}</Text> */}
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                              }}
                            >
                              Lesson:{" "}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              {reqLes.lessonName}
                            </Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                              }}
                            >
                              Status:{" "}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              {reqLes.statusName}
                            </Text>
                          </View>
                          {/* <Text>Lesson Name: {reqLes.lessonName}</Text>
                          <Text>Status: {reqLes.statusName}</Text> */}
                        </View>
                        <View
                          style={{
                            // backgroundColor: "pink",
                            justifyContent: "center",
                          }}
                        >
                          <Feather
                            name="chevron-right"
                            color="black"
                            size={30}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: "95%",
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  // borderBottomWidth: 0.5,
                  // alignItems: "flex-start",
                }}
              >
                Request Subject
              </Text>
            </View>
            <View>
              {requestSubject.length > 0 &&
                requestSubject.map((reqSub, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(saveTouchedRequestSubject(reqSub));
                          navigation.navigate("Request Subject");
                        }}
                        style={{
                          marginHorizontal: 5,
                          marginVertical: 5,
                          // backgroundColor: "pink",
                          flex: 1,
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ flex: 8 }}>
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                              }}
                            >
                              Subject:{" "}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              {reqSub.subjectName}
                            </Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                              }}
                            >
                              Status:{" "}
                            </Text>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              {reqSub.statusName}
                            </Text>
                          </View>
                          {/* <Text>Subject Name: {reqSub.subjectName}</Text>
                          <Text>Status: {reqSub.statusName}</Text> */}
                        </View>
                        <View
                          style={{
                            // backgroundColor: "pink",
                            justifyContent: "center",
                          }}
                        >
                          <Feather
                            name="chevron-right"
                            color="black"
                            size={30}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3c3c3",
  },
  header: {
    // flex: 2,
    // backgroundColor: "blue",
  },
  part1: {
    // flex: 3,
    // backgroundColor: "red",
  },
  part2: {
    // flex: 3,
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
  part3: {
    // flex: 3,
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
});
