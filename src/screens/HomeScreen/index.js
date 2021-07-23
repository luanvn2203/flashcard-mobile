import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@ant-design/react-native/lib/button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogoutButton from "../../components/LogoutButton";
import authAPI from "../../apis/auth.api";
import LearningScreen from "./LearningScreen/index";
// import SettingScreen from './SettingsScreen/index';
import SearchScreen from "./SearchScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLoadingState,
  saveAccessToken,
  saveSignedInUser,
} from "../../redux/actions/auth";
import SettingsScreen from "./SettingScreen";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const getMyInfo = async () => {
      const myInfo = await authAPI.getMe(accessToken);
      dispatch(saveSignedInUser(myInfo.account));
    };

    getMyInfo();
  }, []);

  const handleLogoutClick = async () => {
    // dispatch(changeLoadingState(true))
    dispatch(
      saveAccessToken({
        accessToken: null,
        refreshToken: null,
        expirationTime: null,
        currentUser: null,
      })
    );
    // authAPI.logout(accessToken).then(res => {
    //     dispatch(saveAccessToken({
    //         accessToken: null,
    //         refreshToken: null,
    //         expirationTime: null,
    //         currentUser: null
    //     }));
    setTimeout(() => {
      dispatch(changeLoadingState(false));
      navigation.navigate("SignIn");
    }, 1000);
    // }).catch(err => {
    //     dispatch(saveAccessToken({
    //         accessToken: null,
    //         refreshToken: null,
    //         expirationTime: null,
    //         currentUser: null
    //     }));
    //     setTimeout(() => {
    //         dispatch(changeLoadingState(false))
    //         navigation.navigate("SignIn");
    //     }, 1000);
    // })
  };

  function LearningProcessScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>LearningProcess</Text>
      </View>
    );
  }
  const Tab = createBottomTabNavigator();

  // console.log(currentUser)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Learning") {
            return (
              <Ionicons
                name={focused ? "code" : "code"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Process") {
            return (
              <Ionicons
                name={focused ? "play-forward-outline" : "play-forward-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search") {
            return (
              <Ionicons
                name={focused ? "search" : "search"}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      initialRouteName="Learning"
    >
      <Tab.Screen name="Learning" component={LearningScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Process" component={LearningProcessScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b4c9b",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
