import Button from "@ant-design/react-native/lib/button";
import { Card, WingBlank } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import subjectAPI from "../../../apis/subject.api";
import { useDispatch, useSelector } from "react-redux";
import { saveListSubjectInterest } from "../../../redux/actions/subject";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import lessionAPI from "../../../apis/lession.api";
import Moment from "moment";
// import subjectAPI from "../../../apis/subject.api";
import {
  saveListLessionFoundBySubjectId,
  saveTouchedLession,
} from "../../../redux/actions/lession";
import { Ionicons } from "@expo/vector-icons";

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
    const response = await lessionAPI.getPublicLessionBySubId(
      {
        subjectId: touchedSubject.subjectId,
      },
      accessToken
    );
    // console.log(response);
    if (response.status === "Success") {
      // dispatch(saveListLessionFoundBySubjectId(response.lession))
      // setIsLoading(false)
      setTotal(response.total);
      setListLessionBySubjectId(response.lession);
    } else {
      // setIsLoading(false)
      // if (listLessionBySubjectId.length > 0) {
      //     // dispatch(saveListLessionFoundBySubjectId(null))
      // }
      setSubjectInfo(null);
      setResMessage(response.message);
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

  const renderItem = ({ item }) => {
    return (
      <WingBlank size="sm" style={styles.container}>
        {/* <Text>Texttt</Text> */}
        <TouchableOpacity
          onPress={(e) => {
            dispatch(saveTouchedLession(item));
            navigation.navigate("Flashcard");
          }}
        >
          <Card style={styles.card}>
            <Card.Header
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
              content="Public"
              extra={item.createdDate.slice(0, 10)}
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
              <Text style={styles.textInfo}>
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
    backgroundColor: "rgba(112,193,248,0.2)",
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
    marginTop: -10,
  },
  subjectTitle: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
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
    flex: 5,
  },
  footer: {
    flex: 5,
  },
  viewHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  textHeader: {
    justifyContent: "flex-start",
    paddingBottom: 5,
  },
  button_ac: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInfo: {
    color: "blue",
    fontSize: 15,
  },
});
