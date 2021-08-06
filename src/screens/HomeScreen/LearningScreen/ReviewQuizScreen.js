import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HTML from "react-native-render-html";

const ReviewQuizScreen = ({}) => {
  const { historyQuiz } = useSelector((state) => state.reviewReducer);
  const { resultQuiz } = useSelector((state) => state.submitQuizReducer);
  const listQuestion = historyQuiz.test_detail.listQuestion;
  const listUserOption = historyQuiz.user_choice;
  const isLicensed =
    resultQuiz.result.NumOfTakeQuizTime > 3 || historyQuiz.totalCore > 8;
  const [isClickViewResult, setIsClickViewResult] = useState(false);

  console.log(historyQuiz);
  console.log(resultQuiz.result.NumOfTakeQuizTime);
  const renderIcon = (quest, op) => {
    for (let i = 0; i < listUserOption.length; i++) {
      const opByOp = JSON.parse(listUserOption[i].optionId);
      for (let j = 0; j < opByOp.length; j++) {
        if (
          listUserOption[i].questionId === quest.questionId &&
          op.isCorrect &&
          opByOp[j] === op.optionId
        ) {
          return (
            <View>
              <Feather name="check" color="#fff" size={20} />
            </View>
          );
        } else if (
          listUserOption[i].questionId === quest.questionId &&
          !op.isCorrect &&
          opByOp[j] === op.optionId
        ) {
          return (
            <View>
              <Feather name="x" color="red" size={20} />
            </View>
          );
        }
      }
    }
  };

  const viewAllAnswer = () => {
    if (isLicensed) {
      setIsClickViewResult(true);
    } else {
      Alert.alert(
        "View All Answer",
        "You have to pass 80% quiz or do this quiz 3 times to unclook View All Answer?",
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel",
          // },
          {
            text: "OK",
            // onPress: () => navigation.navigate("Result Quiz"),
          },
        ]
      );
    }
    console.log(isLicensed);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>Review Quiz Screen</Text> */}
        <View style={{ flex: 1 }}>
          {listQuestion.map((question, index) => {
            return (
              <View key={index} style={styles.mainView}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Question {index + 1}:{" "}
                </Text>
                <View style={{ marginBottom: 8, flex: 1 }}>
                  {/* {question.questionContent} */}
                  <View style={{ marginBottom: 10 }}>
                    <HTML
                      source={{ html: question.questionContent }}
                      imagesMaxWidth={Dimensions.get("window").width - 100}
                      contentWidth={Dimensions.get("window").width}
                    />
                  </View>

                  {question.options.map((option, i) => {
                    {
                      return (
                        <View
                          key={i}
                          style={{
                            backgroundColor:
                              option.isCorrect && isClickViewResult
                                ? "#42f572"
                                : null,
                            flex: 1,
                            flexDirection: "row",
                            marginBottom: 5,
                          }}
                        >
                          {/* /////// */}
                          <View
                            style={{
                              flex: 0.75,
                              justifyContent: "center",
                              marginVertical: 5,
                            }}
                          >
                            {renderIcon(question, option)}
                          </View>
                          <View
                            style={{
                              flex: 9.25,
                              justifyContent: "center",
                              marginVertical: 5,
                            }}
                          >
                            <Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                              >
                                Option {i + 1}:
                              </Text>
                              <Text> {option.optionContent}</Text>
                            </Text>
                          </View>
                        </View>
                      );
                      // return listUserOption.map((u, j) => {
                      // });
                    }
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={{
            // flex: 1,
            // width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#107895",
            // borderColor: "#009387",
            // borderWidth: 1,
            marginHorizontal: 1,
            // marginVertical: 10,
          }}
          onPress={viewAllAnswer}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            View All Answer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    marginBottom: 10,
    // flex: 1,
    // textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.7,
    padding: 5,
    borderRadius: 5,
    // backgroundColor: "pink",
  },
  viewResultButton: {
    // backgroundColor: "green",
    flex: 0.75,
  },
});
