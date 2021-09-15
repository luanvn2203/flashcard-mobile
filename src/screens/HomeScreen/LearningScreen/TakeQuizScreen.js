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
import { color } from "react-native-reanimated";

const TakeQuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedQuiz } = useSelector((state) => state.quizReducer);
  const [listQuestion, setListQuestion] = useState([]);
  const [checked, setChecked] = useState(false);
  const [userChoice, setUserChoice] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [countQuiz, setCountQuiz] = useState(0);

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
      // console.log(listData);
      setListQuestion(res.listQuestion);
    }
  };

  useEffect(() => {
    getData();

    let interval = setInterval(() => {
      setTimeCount((timeCount) => {
        return timeCount + 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
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
      // Alert.alert(
      //   "Confirm Submit This Quiz",
      //   "Are you sure to Submit This Quiz?",
      //   [
      //     {
      //       text: "Cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel",
      //     },
      //     {
      //       text: "OK",
      //       onPress: () => navigation.navigate("Result Quiz"),
      //     },
      //   ]
      // );
      navigation.navigate("Result Quiz");
    }
  };

  const handleNextQuiz = (val) => {
    setCountQuiz(countQuiz + 1);
  };

  const handlePreQuiz = (val) => {
    setCountQuiz(countQuiz - 1);
  };

  const handleCheckBoxPress = (optionId, questionId) => {
    console.log(optionId, questionId);
    setChecked(!checked);
  };
  // console.log(userChoice);
  // console.log(listQuestion);

  const handleSubmit = () => {
    console.log(userChoice);
  };

  // const tagStyle = {
  //   p: {
  //     color: "#fff",
  //   },
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <View
        style={{
          flex: 1,
          // backgroundColor: "green"
        }}
      >
        <Text style={{ color: "#1E2325" }}>{timeCount}</Text>
      </View> */}
      {listQuestion.length > 0 && (
        <View
          style={{
            flex: 15,
            // backgroundColor: "pink",
          }}
        >
          <View style={(styles.question, { flex: 1 })}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: "#F1F3F4",

                // borderRadius: 15,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <View style={{ flex: 5 }}>
                <Text style={styles.questionIndex}>
                  Question {countQuiz + 1} :
                </Text>
                <ScrollView contentContainerStyle={styles.questionHtml}>
                  <HTML
                    source={{ html: listQuestion[countQuiz].questionContent }}
                    imagesMaxWidth={Dimensions.get("window").width - 100}
                    contentWidth={Dimensions.get("window").width}
                    // tagsStyles={tagStyle}
                  />
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 5,
                  backgroundColor: "#fff",
                  marginHorizontal: 10,
                  marginVertical: 15,
                  borderRadius: 12,

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
              >
                <ScrollView>
                  {listQuestion[countQuiz].options && (
                    <CheckboxGroup
                      key={listQuestion[countQuiz].questionId}
                      callback={(selected) => {
                        let isExist = userChoice.findIndex(
                          (item, index) =>
                            item.questionId ===
                            listQuestion[countQuiz].questionId
                        );
                        // console.log(isExist);
                        // console.log(question.questionId);

                        if (isExist !== -1) {
                          userChoice[isExist] = {
                            questionId: listQuestion[countQuiz].questionId,
                            optionId_choice: selected,
                          };
                        } else {
                          userChoice.push({
                            questionId: listQuestion[countQuiz].questionId,
                            optionId_choice: selected,
                          });
                        }
                        // console.log(question.questionId);
                        // console.log(selected);
                      }}
                      iconColor={"#00a2dd"}
                      iconSize={25}
                      checkedIcon="ios-checkbox-outline"
                      uncheckedIcon="ios-square-outline"
                      checkboxes={listQuestion[countQuiz].options}
                      labelStyle={{
                        color: "#333",
                        marginHorizontal: 10,
                      }}
                      rowStyle={{
                        flexDirection: "row",
                        marginVertical: 7,
                        marginLeft: 5,
                      }}
                      rowDirection={"column"}
                    />
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
          {/* {listQuestion.map((question, index) => { */}
          {/* return  ()); */}
          {/* })} */}
        </View>
      )}
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 2,
            // width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#107895",
            // borderColor: "#009387",
            // borderWidth: 1,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={handlePreQuiz}
        >
          <Feather name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 6,
            // width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#107895",
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

        <TouchableOpacity
          style={{
            flex: 2,
            // width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#107895",
            // borderColor: "#009387",
            // borderWidth: 1,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={handleNextQuiz}
        >
          <Feather name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* <Button onPress={handleSubmitQuiz} title={"Submit"} /> */}
    </View>
  );
};

export default TakeQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(0,139,139)",
  },
  question: {
    // backgroundColor: "rgba(255,255,255,0.5)",
    marginTop: 5,
    borderRadius: 4,
    minHeight: 80,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  questionIndex: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1E2325",
    marginTop: 10,
    marginLeft: 10,
  },
  questionHtml: {
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 50,
  },
});
