import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import submitAPI from "../../../src/apis/submit.api";
import subjectAPI from "../../../src/apis/subject.api";
import lessionAPI from "../../../src/apis/lession.api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import HistoryScreen from "./HistoryScreen";
import ProcessQuizScreen from "./ProcessScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { saveTouchedRequestLesson } from "../../redux/actions/lession";
import HomeProcessScreen from "./HomeProcess";
import RequestLessonScreen from "./RequestLessonScreen";
import RequestSubjectScreen from "./RequestSubjectScreen";
import RecentScreen from "./ProcessScreen";

const ProcessScreen = ({ navigation }) => {
  const HomeScreenStack = createStackNavigator();
  return (
    <HomeScreenStack.Navigator initialRouteName="HomeProcess">
      <HomeScreenStack.Screen
        name="HomeProcess"
        component={HomeProcessScreen}
      />
      {/* <HomeScreenStack.Screen name="Process" component={ProcessQuizScreen} /> */}
      <HomeScreenStack.Screen
        name="Request Subject"
        component={RequestSubjectScreen}
      />
      <HomeScreenStack.Screen
        name="Request Lesson"
        component={RequestLessonScreen}
      />
      <HomeScreenStack.Screen name="Recent" component={RecentScreen} />
      <HomeScreenStack.Screen name="History" component={HistoryScreen} />
    </HomeScreenStack.Navigator>
  );
};

export default ProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 2,
  },
  part1: {
    flex: 3,
  },
  part2: {
    flex: 3,
  },
  part3: {
    flex: 3,
  },
});
