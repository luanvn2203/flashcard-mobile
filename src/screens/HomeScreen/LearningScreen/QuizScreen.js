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
  Modal,
  Pressable,
} from "react-native";
import { saveQuizIdTouched } from "../../../redux/actions/quiz";
import Moment from "moment";

const QuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedSubject } = useSelector((state) => state.subjectReducer);
  const [listQuiz, setListQuiz] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    // console.log(res);
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
    // navigation.navigate("Take Quiz");
  };

  const renderModal = (val) => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.modalText}>Author: {val.author}</Text>
                <Text style={styles.modalText}>
                  Date of create: {Moment(val.createDate).format("YYYY-MM-DD")}
                </Text>
                <Text style={styles.modalText}>
                  Total question: {val.total_question}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { marginRight: 15 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => createAlertConfirmTakeQuiz()}
                >
                  <Text style={styles.textStyle}>Take Quiz</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [touchedSubject]);

  console.log(listQuiz);
  // console.log(touchedSubject.subjectId);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text_header}>Quiz Screen</Text> */}
      {listQuiz.length > 0 ? (
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
                  // navigation.navigate("Take Quiz");
                  createAlertConfirmTakeQuiz();

                  // setModalVisible(true);
                }}
                style={styles.item}
              >
                {/* <View>{renderModal(item)}</View> */}
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
      ) : (
        <View>
          <Text>Nothing here</Text>
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
    // paddingTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    // marginTop: 24,
    marginTop: 10,
    padding: 30,
    backgroundColor: "#009387",
    flexDirection: "row",
    marginBottom: 10,
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
  /////////////
  modalView: {
    marginHorizontal: 10,
    marginTop: "50%",
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
