import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import quizAPI from "../../../apis/quiz.api";
import Feather from "react-native-vector-icons/Feather";
import submitAPI from "../../../apis/submit.api";
import { saveResultQuiz } from "../../../redux/actions/submit";
import { CheckBox } from "react-native-elements";
// import { createStackNavigator } from '@react-navigation/stack';
import HTML from 'react-native-render-html';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  // Button,
} from "react-native";

import { Checkbox, WingBlank } from "@ant-design/react-native";
import { ScrollView } from "react-native-gesture-handler";

const CheckboxItem = Checkbox.CheckboxItem;

const TakeQuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedQuiz } = useSelector((state) => state.quizReducer);
  const [listQuestion, setListQuestion] = useState([]);
  const [counter, setCounter] = useState(0);
  const [optionChoosed, setOptionChoosed] = useState([]);
  const [userChoice, setUserChoice] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const [resultQuiz, setResultQuiz] = useState();

  const dispatch = useDispatch();

  // const cc = {
  //   questionId: 21,
  //   optionId_choice: [40],
  // };

  const getData = async () => {
    // console.log(JSON.parse(currentUser.interestTopic));
    const res = await quizAPI.getTakeQuizQuestions(
      {
        quizTestId: touchedQuiz.id,
      },
      accessToken
    );
    // const pr = JSON.parse(res.testFound);
    // console.log(res);
    if (res.status === "Success") {
      // setListQuiz(res.testFound);
      setListQuestion(res.listQuestion);
    }
  };

  const handleChangeCounterNext = () => {
    setCounter(counter + 1);
  };

  const handleChangeCounterPre = () => {
    setCounter(counter - 1);
  };

  const handleOptionChoose = (val) => {
    optionChoosed[counter] = val;
    const xFactor = {
      questionId: listQuestion[counter].questionId,
      optionId_choice: [optionChoosed[counter]],
    };
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

    userChoice[counter] = xFactor;

  };

  useEffect(() => {
    getData();
  }, [touchedQuiz]);


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
      // setResultQuiz(response);
      dispatch(saveResultQuiz(response));
      navigation.navigate("ResultQuiz");
    }
  };

  console.log(listQuestion);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={styles.text_header}>Take Quiz Screen</Text> */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View>
            <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
              Questions
            </Text>
          </View>
          <View style={styles.perQuestion}>
            <Text
              style={{
                justifyContent: "center",
                marginRight: 10,
                fontSize: 18,
              }}
            >
              {counter + 1 + "/" + listQuestion.length}
            </Text>
          </View>
        </View>
      </View>
      {/* /////////////////////////////////////// */}
      {/* {listQuestion.length > 0 && (
        <View>
          {listQuestion[counter].options.map((option) => {
            <CheckboxItem>{option.optionContent}</CheckboxItem>;
          })}
        </View>
      )} */}
      {/* Co loi thi bo code duoi dong nay */}
      <View style={styles.mainView}>
        {listQuestion.length > 0 && (
          <View style={styles.container}>
            <View style={styles.mainViewText}>
              <Text style={styles.textCounterQuestion}>
                {counter + 1 + "."}
              </Text>
              <Text style={styles.text_question}>
                {listQuestion[counter].questionContent}
              </Text>
            </View>
            <View style={styles.mainOptionView}>
              {listQuestion[counter].options.map((value, index) => (
                <View key={index} style={styles.optionContainer}>
                  <CheckBox
                    title={value.optionContent}
                    checked={isChecked}
                    onPress={() => handleOptionChoose(value.optionId)}
                  />
                </View>
                // <TouchableOpacity
                //   key={index}
                //   style={
                //     isClick
                //       ? styles.optionContainerClick
                //       : styles.optionContainerNotClick
                //   }
                //   onPress={() => handleOptionChoose(value.optionId)}
                // >
                //   <View>
                //     {/* <View key={index} style={styles.optionContainer}> */}
                //     <Text key={index} style={styles.option}>
                //       {value.optionContent}
                //     </Text>
                //   </View>
                // </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
      {/* ////////////////////////////////////////// */}
      <View style={styles.buttonContainer}>
        <View style={styles.viewButtonLeft}>
          {counter >= 1 ? (
            <TouchableOpacity
              onPress={() => handleChangeCounterPre()}
              style={styles.buttonLeft}
            >
              <View>
                <Feather name="chevron-left" size={20} color="#fff" />
                {/* <Text style={styles.buttonText}>NEXT</Text> */}
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {listQuestion && listQuestion.map((question, index) => {
          return (
            <WingBlank key={question.questionId} style={styles.question}>
              <HTML source={{ html: question.questionContent }} imagesMaxWidth={(Dimensions.get('window').width - 100)} />
              {question.options.length > 0 && question.options.map((option, index) => {
                return <Text key={option.optionId}>{option.optionContent}</Text>
              })}
            </WingBlank>
          )
        })}
    </View>
  );
};

export default TakeQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(22,157,158)",
    // justifyContent: "flex-end",
    // alignItems: "center",
    // height: "60%",
  },
  question: {
    marginTop: 3,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  header: {
    flex: 1,
    // backgroundColor: "#fff",
    flexDirection: "row",
    width: "88%",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
    // backgroundColor: "yellow",
  },
  text_question: {
    fontSize: 20,
    // textAlign: "left",
    // alignItems: "flex-start",
  },
  textCounterQuestion: {
    fontSize: 20,
    color: "#009387",
    marginRight: 10,
  },
  questionContainer: {
    // marginLeft: 20,
    flexDirection: "row",
    // backgroundColor: "pink",
    width: "88%",
    marginBottom: 30,
    justifyContent: "center",
  },
  option: {
    // color: "red",
    fontSize: 16,
    marginLeft: 10,
  },
  optionContainer: {
    width: "78%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 15,
  },
  optionContainerClick: {
    width: "78%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "pink",
    borderWidth: 1,
    marginBottom: 15,
    borderColor: "gray",
    height: 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,

    borderRadius: 5,
  },
  perQuestion: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "flex-end",
  },
  buttonLeft: {
    backgroundColor: "#009387",
    width: 60,
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    marginLeft: 30,
  },
  buttonRight: {
    backgroundColor: "#009387",
    width: 60,
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    marginRight: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    // textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    // backgroundColor: "green",
    marginBottom: 20,
  },
  viewButtonRight: {
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "flex-end",
    // backgroundColor: "pink",
    // marginRight: 10,
  },
  viewButtonLeft: {
    flex: 1,
    // justifyContent: "flex-end",
    // backgroundColor: "blue",
  },
  mainView: {
    flex: 7,
    // backgroundColor: "pink",
    justifyContent: "flex-start",
  },
  mainViewText: {
    flex: 3,
    flexDirection: "row",
    marginBottom: 30,
    // alignItems: "flex-start",
    marginLeft: 15,
    // backgroundColor: "pink",
    marginRight: 15,
  },
  mainOptionView: {
    width: "100%",
    flex: 7,
    // backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});
