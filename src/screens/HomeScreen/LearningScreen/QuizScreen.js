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
import subjectAPI from "../../../apis/subject.api";

const QuizScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { touchedSubject } = useSelector((state) => state.subjectReducer);
  const [listQuiz, setListQuiz] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    let isMounted = true;

    // console.log(JSON.parse(currentUser.interestTopic));
    const res = await quizAPI.getQuizBySubjectId(
      {
        subjectId: touchedSubject.subjectId,
      },
      accessToken
    );
    if (isMounted) {
      if (res.status === "Success") {
        setListQuiz(res.testFound);
      } else {
        console.log(res.message)
      }
    } else {
      return isMounted = false
    }
  };

  const createAlertConfirmTakeQuiz = () => {
    Alert.alert("Notice !", "Are you sure to Take This Quiz?", [
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

  // const renderModal = (val) => {
  //   return (
  //     <View>
  //       <Modal
  //         animationType="slide"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           Alert.alert("Modal has been closed.");
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <View style={styles.centeredView}>
  //           <View style={styles.modalView}>
  //             <View style={{ alignItems: "flex-start" }}>
  //               <Text style={styles.modalText}>Author: {val.author}</Text>
  //               <Text style={styles.modalText}>
  //                 Date of create: {Moment(val.createDate).format("YYYY-MM-DD")}
  //               </Text>
  //               <Text style={styles.modalText}>
  //                 Total question: {val.total_question}
  //               </Text>
  //             </View>
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               <Pressable
  //                 style={[
  //                   styles.button,
  //                   styles.buttonClose,
  //                   { marginRight: 15 },
  //                 ]}
  //                 onPress={() => setModalVisible(!modalVisible)}
  //               >
  //                 <Text style={styles.textStyle}>Cancel</Text>
  //               </Pressable>
  //               <Pressable
  //                 style={[styles.button, styles.buttonClose]}
  //                 onPress={() => createAlertConfirmTakeQuiz()}
  //               >
  //                 <Text style={styles.textStyle}>Take Quiz</Text>
  //               </Pressable>
  //             </View>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [touchedSubject]);


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
                onPress={async () => {
                  const response = await quizAPI.checkAccess({ quizTestId: item.id }, accessToken)
                  if (response.status === "Success") {
                    dispatch(saveQuizIdTouched(item));
                    createAlertConfirmTakeQuiz();
                  } else {
                    console.log(response)
                    const message = `${response.message} \nLessons require: ${response.requireLesson?.map(item => `${item.lessionName}`)}`
                    Alert.alert("Notice !", message, [
                      {
                        text: "OK",
                      },
                    ]);
                  }

                }}
                style={styles.item}
              >
                <WingBlank size='lg'>
                  <View style={styles.startSide}>
                    <Text style={styles.textItemName}>{item.testName}</Text>
                    <Feather name="chevron-right" size={20} color="#fff" />
                  </View>
                  <View>
                    <Text>Lessons required: <Text style={styles.lessonRequire}>{item.lessions.map((les, index) => {
                      console.log(les)
                      return (
                        <Text key={index.toString()} style={{ marginLeft: 3, backgroundColor: '#70c1f8', color: '#fff', padding: 2 }}>{les.lessionName}</Text>
                      )
                    })} </Text></Text>

                  </View>
                </WingBlank>

              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', flex: 2 }} >This subject has no test yet!</Text>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4ecfa",
  },
  item: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
  startSide: {
    flexDirection: 'row'
  },
  textItemName: {
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  lessonRequire: {
    fontWeight: 'bold',
  }
});
