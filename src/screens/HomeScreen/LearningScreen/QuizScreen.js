// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Card, WingBlank } from "@ant-design/react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import quizAPI from "../../../apis/quiz.api";
import Feather from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { saveQuizIdTouched } from "../../../redux/actions/quiz";

const QuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedSubject } = useSelector((state) => state.subjectReducer);
  const [listQuiz, setListQuiz] = useState([]);

  const getData = async () => {
    // console.log(JSON.parse(currentUser.interestTopic));
    const res = await quizAPI.getQuizBySubjectId(
      {
        subjectId: touchedSubject.subjectId,
      },
      accessToken
    );
    // console.log(res);
    // const pr = JSON.parse(res.testFound);
    console.log(res);
    if (res.status === "Success") {
      setListQuiz(res.testFound);
    }
  };

  const createAlertConfirmTakeQuiz = () => {
    Alert.alert("Confirm Take This Quiz", "Are you sure to Take This Quiz?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => navigation.navigate("Take Quiz"),
      },
    ]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [touchedSubject]);

  // console.log(listQuiz);
  // console.log(touchedSubject.subjectId);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text_header}>Quiz Screen</Text> */}
      {listQuiz && (
        <View>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={listQuiz}
            renderItem={({ item }) => (
              <TouchableOpacity
                // id={item.lessionId}
                onPress={() => {
                  dispatch(saveQuizIdTouched(item));
                  // console.log(item.lessionId);
                  // navigation.navigate("TakeQuiz");
                  createAlertConfirmTakeQuiz();
                }}
                style={styles.item}
              >
                <View style={styles.startSide}>
                  <Text style={styles.textItemName}>{item.testName}</Text>
                  {/* <Text style={styles.textItemDescription}>
                    {item.lessionDescription}
                  </Text> */}
                </View>
                <View style={styles.iconNext}>
                  <Feather name="chevron-right" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
  },
  textItemName: {
    color: "#fff",
    fontSize: 26,
  },
  textItemDescription: {
    color: "#fff",
    fontSize: 22,
  },
  text_header: {
    color: "#009387",
    fontWeight: "bold",
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    textAlign: "center",
  },
  iconNext: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  startSide: {
    flex: 1,
  },
});
