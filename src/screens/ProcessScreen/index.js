import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import submitAPI from "../../../src/apis/submit.api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import HistoryScreen from "./HistoryScreen";
import ProcessQuizScreen from "./ProcessScreen";
import { createStackNavigator } from "@react-navigation/stack";

const ProcessScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [historyQuiz, setHistoryQuiz] = useState([]);

  const getData = async () => {
    const res = await submitAPI.getAllHistoryByMe(accessToken);
    console.log(res);
    if (res.status === "Success") {
      setHistoryQuiz(res.listHistory);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(historyQuiz);

  const HomeScreenStack = createStackNavigator();

  return (
    <HomeScreenStack.Navigator initialRouteName="History">
      <HomeScreenStack.Screen name="Process" component={ProcessQuizScreen} />
      <HomeScreenStack.Screen name="History" component={HistoryScreen} />
    </HomeScreenStack.Navigator>
  );
};

export default ProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
