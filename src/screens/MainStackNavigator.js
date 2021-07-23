import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import SignInScreen from "./LoginScreen/index";
import HomeScreen from "./HomeScreen/index";
import RegisterScreen from "./RegisterScreen/RegisterScreen";
import LoadingScreen from "./LoadingScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { saveSignedInUser } from "../redux/actions/auth";
import authAPI from "../apis/auth.api";

MainStackNavigator.propTypes = {};

const StackScreen = createStackNavigator();

function MainStackNavigator(props) {
  const { accessToken } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  // //   const getMyInfo = async () => {
  // //     const myInfo = await authAPI.getMe(accessToken);
  // //     // console.log(myInfo)
  // //     dispatch(saveSignedInUser(myInfo.account));
  // //   };
  // //   getMyInfo();
  // // }, []);

  return (
    <NavigationContainer>
      {/* {isLoading ?
                <StackScreen.Navigator screenOptions={{ headerShown: false }} initialRouteName='Loading'>
                    <StackScreen.Screen name="Loading" component={LoadingScreen} />
                </StackScreen.Navigator>
                : */}
      <StackScreen.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={accessToken != null ? "Home" : "SignIn"}
      >
        <StackScreen.Screen name="SignIn" component={SignInScreen} />
        <StackScreen.Screen name="Home" component={HomeScreen} />
        <StackScreen.Screen name="Register" component={RegisterScreen} />
        <StackScreen.Screen name="Loading" component={LoadingScreen} />
      </StackScreen.Navigator>
      {/* } */}
    </NavigationContainer>
  );
}

export default MainStackNavigator;
