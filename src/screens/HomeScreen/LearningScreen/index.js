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

import InterestScreen from "./InterestScreen";
import LessionScreen from "./LessionScreen";
import FlashcardScreen from "./FlashcardScreen";
import FlashcardContentScreen from "./FlashcardContentScreen";
import QuizScreen from "./QuizScreen";
import TakeQuizScreen from "./TakeQuizScreen";
import ResultQuizScreen from "./ResultQuizScreen";
import ReviewQuizScreen from "./ReviewQuizScreen";

LearningScreen.propTypes = {};
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <WingBlank style={styles.card} size="lg">
    <Card>
      <Card.Header
        title="This is title"
        thumbStyle={{ width: 30, height: 30 }}
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<Text style={styles.author}>this is text</Text>}
      />
      <Card.Body>
        <View style={{ height: 42 }}>
          <Text style={{ marginLeft: 16 }}>Card Content</Text>
        </View>
      </Card.Body>
      <Card.Footer content={title} extra="footer extra content" />
    </Card>
  </WingBlank>
);

function LearningScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  const { listSubjectInterest } = useSelector((state) => state.subjectReducer);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const HomeScreenStack = createStackNavigator();
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "darkcyan" },
        headerTintColor: "#fff",
      }}
      initialRouteName="InterestScreen"
    >
      <HomeScreenStack.Screen name="Interest" component={InterestScreen} />
      <HomeScreenStack.Screen name="Lession" component={LessionScreen} />
      <HomeScreenStack.Screen name="Flashcard" component={FlashcardScreen} />
      <HomeScreenStack.Screen
        name="Flashcard content"
        component={FlashcardContentScreen}
      />
      <HomeScreenStack.Screen name="Quiz" component={QuizScreen} />
      <HomeScreenStack.Screen name="Take Quiz" component={TakeQuizScreen} />
      <HomeScreenStack.Screen name="Result Quiz" component={ResultQuizScreen} />
      <HomeScreenStack.Screen name="Review Quiz" component={ReviewQuizScreen} />
    </HomeScreenStack.Navigator>
  );
}

export default LearningScreen;
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
    borderRadius: 4,
    padding: 4,
  },
});
