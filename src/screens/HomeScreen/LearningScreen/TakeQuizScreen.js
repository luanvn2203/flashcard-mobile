import React, { useEffect, useState } from "react";
// import { createStackNavigator } from '@react-navigation/stack';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import HTML from "react-native-render-html";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import quizAPI from "../../../apis/quiz.api";
import submitAPI from "../../../apis/submit.api";
import { saveResultQuiz } from "../../../redux/actions/submit";
import CheckboxGroup from "react-native-checkbox-group";

const TakeQuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedQuiz } = useSelector((state) => state.quizReducer);
  const [listQuestion, setListQuestion] = useState([]);
  const [checked, setChecked] = useState(false);
  const [userChoice, setUserChoice] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    const res = await quizAPI.getTakeQuizQuestions(
      {
        quizTestId: touchedQuiz.id,
      },
      accessToken
    );
    // console.log(res);
    if (res.status === "Success") {
      const listData = res.listQuestion;
      listData.map((question) => {
        const checkboxes = [];
        if (question.options) {
          question.options.map((option, index) => {
            const value = {
              label: option.optionContent,
              value: option.optionId,
            };
            checkboxes.push(value);
          });
        }
        question.options = checkboxes;
      });
      setListQuestion(res.listQuestion);
    }
  };

  useEffect(() => {
    getData();
  }, [touchedQuiz]);

  // const createAlertConfirmTakeQuiz = () => {
  //   Alert.alert("Confirm Take This Quiz", "Are you sure to Take This Quiz?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     {
  //       text: "OK",
  //       onPress: () => navigation.navigate("Take Quiz"),
  //     },
  //   ]);
  // };

  const handleSubmitQuiz = async () => {
    const response = await submitAPI.submitQuiz(
      {
        quizTestId: touchedQuiz.id,
        numOfQuestion: touchedQuiz.total_question,
        userChoice: userChoice,
      },
      accessToken
    );
    // console.log(response);
    if (response.status === "Success") {
      dispatch(saveResultQuiz(response));
      Alert.alert(
        "Confirm Submit This Quiz",
        "Are you sure to Submit This Quiz?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => navigation.navigate("Result Quiz"),
          },
        ]
      );
      // navigation.navigate("ResultQuiz");
    }
  };

  const handleCheckBoxPress = (optionId, questionId) => {
    setChecked(!checked);
  };
  // console.log(userChoice);

  const handleSubmit = () => {
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {listQuestion.length > 0 && (
        <View>
          {listQuestion.map((question, index) => {
            return (
              <View key={index} style={styles.question}>
                <View>
                  <Text style={styles.questionIndex}>
                    Question {index + 1} :
                  </Text>
                  <HTML
                    source={{ html: question.questionContent }}
                    imagesMaxWidth={Dimensions.get("window").width - 100}
                    contentWidth={Dimensions.get("window").width}
                  />
                  {question.options && (
                    <CheckboxGroup
                      key={question.questionId}
                      callback={(selected) => {
                        let isExist = userChoice.findIndex(
                          (item, index) =>
                            item.questionId === question.questionId
                        );
                        // console.log(isExist);
                        // console.log(question.questionId);

                        if (isExist !== -1) {
                          userChoice[isExist] = {
                            questionId: question.questionId,
                            optionId_choice: selected,
                          };
                        } else {
                          userChoice.push({
                            questionId: question.questionId,
                            optionId_choice: selected,
                          });
                        }
                        // console.log(question.questionId);
                        // console.log(selected);
                      }}
                      iconColor={"#00a2dd"}
                      iconSize={30}
                      checkedIcon="ios-checkbox-outline"
                      uncheckedIcon="ios-square-outline"
                      checkboxes={question.options}
                      labelStyle={{
                        color: "#333",
                      }}
                      rowStyle={{
                        flexDirection: "row",
                      }}
                      rowDirection={"column"}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}
      <TouchableOpacity
        style={{
          flex: 1,
          // width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#009387",
          // borderColor: "#009387",
          // borderWidth: 1,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        onPress={handleSubmitQuiz}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Submit Quiz
        </Text>
      </TouchableOpacity>
      {/* <Button onPress={handleSubmitQuiz} title={"Submit"} /> */}
    </ScrollView>
  );
};

export default TakeQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(0,139,139)",
  },
  question: {
    backgroundColor: "rgba(255,255,255,0.5)",
    marginTop: 5,
    borderRadius: 4,
    minHeight: 80,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  questionIndex: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
