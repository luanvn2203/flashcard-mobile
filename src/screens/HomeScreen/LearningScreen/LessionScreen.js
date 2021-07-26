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
      "This lession is private content !",
      "Do you want to use 7 point to request for seeing this lession content ?",
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
      <WingBlank size="sm" style={styles.container}>
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
          <Card style={styles.card}>
            <Card.Header
              // style={{ marginTop: 5 }}
              title={item.lessionName}
              thumbStyle={{ width: 30, height: 30 }}
              // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra={
                <Text style={styles.author}>
                  <Ionicons name="pricetag-sharp" />
                  {"Lession"}
                </Text>
              }
            />
            <Card.Body>
              <View style={{ minHeight: 20 }}>
                <Text style={{ marginLeft: 16 }}>
                  {item.lessionDescription}
                </Text>
                <Text style={{ marginLeft: 16, color: "blue" }}>
                  {item.author}
                </Text>
              </View>
            </Card.Body>
            <Card.Footer
              content={
                item.statusId == 1 ? (
                  "Public"
                ) : (
                  <Text style={styles.privateContent}>Private</Text>
                )
              }
            />
          </Card>
        </TouchableOpacity>
      </WingBlank>
    );
  };

  //   console.log(subjectInfo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subjectTitle}>#{touchedSubject.subjectName}</Text>
        {subjectInfo !== null ? (
          <View style={styles.viewHeader}>
            <View style={styles.textHeader}>
              <Text style={styles.textAuthor}>
                Author: {subjectInfo.fullName}
              </Text>
              <Text style={styles.textInfo}>
                Created Date:{" "}
                {Moment(subjectInfo.createdDate).format("YYYY-MM-DD")}
              </Text>
              {total !== null && (
                <Text style={styles.textInfo}>Total Lession: {total}</Text>
              )}
              <Text style={styles.textInfo}>
                Subject Description: {subjectInfo.subjectDescription}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button_ac,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 5,
                },
              ]}
              onPress={() => navigation.navigate("Quiz")}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Available Quiz
              </Text>
            </TouchableOpacity>
          </View>
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
      </View>
    </SafeAreaView>
  );
};

export default LessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
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
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    padding: 4,
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
  header: {
    // flex: 5,
    marginBottom: 8,
    marginVertical: 8,
    marginHorizontal: 6,
    // borderRadius: 18,
  },
  footer: {
    flex: 1,
  },
  viewHeader: {
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 4,
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
    color: "#009387",
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
});
