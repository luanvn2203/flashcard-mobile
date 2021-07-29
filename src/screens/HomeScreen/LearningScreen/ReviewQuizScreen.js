import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const ReviewQuizScreen = ({}) => {
  const { resultQuiz } = useSelector((state) => state.reviewReducer);
  const listQuestion = resultQuiz.test_detail.listQuestion;
  const listUserOption = resultQuiz.user_choice;
  // const parseNe = JSON.parse(listUserOption[0].optionId);

  // console.log(parseNe);

  console.log(listQuestion);
  console.log(listUserOption);

  // console.log(resultQuiz);
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

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* <Text>Review Quiz Screen</Text> */}
        <View>
          {listQuestion.map((question, index) => {
            return (
              <View key={index} style={styles.mainView}>
                <Text style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Question {index + 1}:{" "}
                  </Text>
                  {question.questionContent}
                </Text>
                {question.options.map((option, i) => {
                  {
                    return (
                      <View
                        key={i}
                        style={{
                          backgroundColor: option.isCorrect ? "#009387" : null,
                          flex: 1,
                          flexDirection: "row",
                          marginBottom: 5,
                        }}
                      >
                        {/* /////// */}
                        <View style={{ flex: 0.75 }}>
                          {renderIcon(question, option)}
                        </View>
                        <View style={{ flex: 9.25 }}>
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
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    marginBottom: 10,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.7,
    padding: 5,
    borderRadius: 5,
  },
});
