import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import submitAPI from "../../../src/apis/submit.api";
import { ScrollView } from "react-native-gesture-handler";
import Moment from "moment";

const HistoryScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [historyQuiz, setHistoryQuiz] = useState([]);

  const getData = async () => {
    const res = await submitAPI.getAllHistoryByMe(accessToken);
    console.log(res);
    if (res.status === "Success") {
      setHistoryQuiz(res.listHistory);
      console.log(listHistory);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(accessToken);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          marginVertical: 10,
        }}
      >
        <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
          {historyQuiz.map((history, index) => {
            return (
              <View
                key={index}
                style={{
                  marginBottom: 30,
                  flex: 1,
                  backgroundColor: "#009387",
                }}
              >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Subject Name: </Text>
                    <Text>{history.subjectName}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Total Correct: </Text>
                    <Text>{history.numOfCorrect}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Total Question: </Text>
                    <Text>{history.numOfQuestion}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Date Of Take Quiz</Text>
                    <Text>
                      {Moment(history.takeQuizAt).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
