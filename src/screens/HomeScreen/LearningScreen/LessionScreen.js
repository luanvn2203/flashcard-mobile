import { Card, WingBlank } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import Moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import checkAcceptAPI from "../../../apis/check.accessibility";
import lessionAPI from "../../../apis/lession.api";
import privateLessionAPI from "../../../apis/private.lession.api";
import subjectAPI from "../../../apis/subject.api";
// import subjectAPI from "../../../apis/subject.api";
import { saveTouchedLession } from "../../../redux/actions/lession";

const LessionScreen = ({ navigation }) => {
  const { touchedSubject } = useSelector((state) => state.subjectReducer);
  const { accessToken } = useSelector((state) => state.authReducer);
  // const { listLessionBySubjectId } = useSelector(state => state.lessionReducer);

  const [isLoading, setIsLoading] = useState(true);
  const [resMessage, setResMessage] = useState("");
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [total, setTotal] = useState(null);
  const dispatch = useDispatch();

  const [listLessionBySubjectId, setListLessionBySubjectId] = useState(null);

  const getPublicLession = async () => {
    // setIsLoading(true)
    let isMounted = true;

    const response = await lessionAPI.getLessionBySubId(
      {
        subjectId: touchedSubject.subjectId,
      },
      accessToken
    );
    if (isMounted) {
      if (response.status === "Success") {
        setTotal(response.total);
        setListLessionBySubjectId(response.lession);
      } else {
        setSubjectInfo(null);
        setResMessage(response.message);
      }
    } else {
      return (isMounted = false);
    }
  };
  const getSubjectInformation = async () => {
    const response = await subjectAPI.getSubjectById(
      {
        subjectId: touchedSubject.subjectId,
      },
      accessToken
    );
    if (response.status === "Success") {
      setSubjectInfo(response.subjectFound);
    } else {
      setSubjectInfo(null);
    }
  };
  useEffect(() => {
    getPublicLession();
    getSubjectInformation();
  }, [touchedSubject]);

  //   console.log(listLessionBySubjectId);
  const showToastWithGravityAndOffset = useCallback((message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  });
  const showConfirmDialog = (lessionId) => {
    console.log(lessionId);
    return Alert.alert(
      "Notice !",
      `This lesson cannot access withou author permisson
      Do you want to send a request to author first ?
      This action will take away from you 100 point at the next time access this lesson if author approved your request.
      Click "yes" to send.`,
      [
        {
          text: "Yes",
          onPress: async () => {
            // send request subject
            const response = await privateLessionAPI.requestLession(
              { lessionId: lessionId },
              accessToken
            );
            if (response) {
              showToastWithGravityAndOffset(response.message);
            }
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  const renderItem = ({ item }) => {
    return (
      <WingBlank size="sm" style={styles.EachItem}>
        {/* <Text>Texttt</Text> */}
        <TouchableOpacity
          onPress={
            item.statusId === 1
              ? (subject) => {
                dispatch(saveTouchedLession(item));
                navigation.navigate("Flashcard");
              }
              : async () => {
                console.log(item);
                const response = await checkAcceptAPI.checkAcceptLession(
                  { lessionId: item.lessionId },
                  accessToken
                );
                console.log(response);
                if (response.status === "Success") {
                  dispatch(saveTouchedLession(item));
                  navigation.navigate("Flashcard");
                } else if (response.status === "Not Found Request") {
                  showConfirmDialog(item.lessionId);
                }
              }
          }
        >
          <View style={item.statusId === 2 ? styles.lessonContentPrivate : styles.lessonContent} >
            <View style={item.statusId === 2 ? styles.lessonNamePrivate : styles.lessonName} >
              <Text style={item.statusId === 2 ? styles.textLessonPrivate : styles.textLesson}>{item.lessionName}</Text>
            </View>
            <View style={styles.lessonDes} >
              <Text style={styles.textDEs}>{item.lessionDescription}</Text>
            </View>
            <View style={styles.lessonIcon} >
              <Text style={item.joinStatus === 'Join' ? styles.action : styles.action2}>{item.joinStatus}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </WingBlank>
    );
  };

  //   console.log(subjectInfo);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subjectTitle}>
          <Text style={styles.subjectTitleText} > <Ionicons name='book-sharp' size={35} /> {touchedSubject.subjectName}</Text>
        </View>
        {subjectInfo !== null ? (
          <WingBlank style={styles.viewHeader}>
            <View style={styles.textHeader}>
              <Text style={styles.textInfo}>
                <Text style={styles.headContent}>Description:</Text> {subjectInfo.subjectDescription}
              </Text>
              <Text style={styles.textInfo}>
                <Text style={styles.headContent}>Author:</Text> {subjectInfo.fullName}
              </Text>
              <Text style={styles.textInfo}>
                <Text style={styles.headContent}>Created date:</Text>{" "}
                {Moment(subjectInfo.createdDate).format("YYYY-MM-DD")}
              </Text>
              {total !== null && (
                <Text style={styles.textInfo}><Text style={styles.headContent}>Total lesson</Text> {total}</Text>
              )}
              <Text style={styles.headContent} >View Quiz: <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate("Quiz") }} >Quizzes <Ionicons size={15} name='pencil-sharp' /></Text></Text>
            </View>
          </WingBlank>
        ) : null}
      </View>
      <View style={styles.footer}>
        {listLessionBySubjectId !== null ? (
          <FlatList
            data={listLessionBySubjectId}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <WingBlank style={styles.container}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              EMPTY CONTENT
            </Text>
            <Text style={styles.resMessage}>{resMessage}</Text>
          </WingBlank>
        )}
        <Text style={styles.listLesson}>List lesson</Text>
      </View>
    </SafeAreaView>
  );
};

export default LessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4ecfa",
  },
  item: {
    backgroundColor: "rgba(112,193,248,0.2)",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 18,
  },
  title: {
    fontSize: 32,
  },
  card: {
    marginTop: 10,
  },
  subjectTitle: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopColor: 'grey',
    borderLeftColor: '#fff',
    borderBottomColor: "#fff",
    borderRightColor: '#fff',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20
  },
  author: {
    marginLeft: "50%",
  },
  empty: {
    marginTop: "50%",
  },
  resMessage: {
    textAlign: "center",
  },
  footer: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    paddingBottom: 15

  },
  viewHeader: {
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#fff",
    // borderRadius: 10,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 30,
    borderTopEndRadius: 1,
    borderTopStartRadius: 30
  },
  textHeader: {
    justifyContent: "flex-start",
    paddingBottom: 5,
  },
  button_ac: {
    width: "95%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInfo: {
    color: "#000",
    fontSize: 15,
  },
  textAuthor: {
    color: "#009387",
    fontSize: 15,
    marginTop: 10,
  },
  privateContent: {
    backgroundColor: "rgb(143,94,255)",
    width: 50,
    borderRadius: 4,
    color: "#FFF",
  },
  subjectTitleText: {
    color: '#000',
    lineHeight: 50,
    fontSize: 40
  },
  headContent: {
    fontWeight: 'bold'
  },
  EachItem: {
    marginTop: 10
  },
  lessonContent: {
    backgroundColor: '#ececff',
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    padding: 5,
    flexDirection: 'row'
  },
  textLesson: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15
  },
  lessonName: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5
  },
  lessonDes: {
    width: '40%',
    alignItems: 'center'
  },
  lessonIcon: {
    width: '30%',
  },
  action: {
    color: 'green',
    fontSize: 10,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  action2: {
    color: 'black',
    fontSize: 10,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: 'bold'

  },
  textDEs: {
    color: '#000',
    fontSize: 13,
    marginLeft: 5
  },
  listLesson: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  lessonNamePrivate: {
    width: '30%',
    backgroundColor: '#e292e9',
    borderRadius: 10,
    padding: 5,
  },
  textLessonPrivate: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  lessonContentPrivate: {
    backgroundColor: 'rgba(236,219,234,0.9)',
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    padding: 5,
    flexDirection: 'row'
  }
});
