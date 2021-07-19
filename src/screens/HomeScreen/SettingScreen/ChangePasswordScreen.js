import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TransformText,
  TextInput,
  Platform,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";

import authAPI from "../../../apis/auth.api";

const ChangePasswordScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.authReducer);

  const [data, setData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    // isValidPassword: false,
    isPasswordOK: true,
    isNewPasswordOK: true,
    isConfirmNewPasswordOK: true,
    isConfirmMapWithNewPassword: true,
  });

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        currentPassword: val,
        isValidPassword: true,
        isPasswordOK: true,
      });
    } else {
      setData({
        ...data,
        currentPassword: val,
        isValidPassword: false,
        isPasswordOK: false,
      });
    }
  };

  const handleNewPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        newPassword: val,
        isValidPassword: true,
        isNewPasswordOK: true,
      });
    } else {
      setData({
        ...data,
        newPassword: val,
        isValidPassword: false,
        isNewPasswordOK: false,
      });
    }
  };

  const handleConfirmNewPasswordChange = (val) => {
    // if (val.trim().length >= 8) {
    if (val.trim() === data.newPassword) {
      setData({
        ...data,
        confirmNewPassword: val,
        // isValidPassword: true,
        // isConfirmNewPasswordOK: true,
        isConfirmMapWithNewPassword: true,
      });
      // } else {
      //   setData({
      //     ...data,
      //     confirmNewPassword: val,
      //     isValidPassword: true,
      //     isConfirmNewPasswordOK: false,
      //     isConfirmMapWithNewPassword: false,
      //   });
      // }
    } else {
      setData({
        ...data,
        confirmNewPassword: val,
        isValidPassword: false,
        // isConfirmNewPasswordOK: false,
        isConfirmMapWithNewPassword: false,
      });
    }
  };

  const handleSubmitChangePassword = async () => {
    // console.log(data);
    // console.log(interestTopicThis)
    const response = await authAPI.editPassword(
      {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      accessToken
    );
    console.log(response);
    if (response.status === "Success") {
      // console.log(response);
      Alert.alert("Change Password Success", `${response.message}`, [
        { text: "OK" },
      ]);
      // setTimeout(() => {
      //     navigation.navigate("SignIn");
      // }, 2000);
      navigation.navigate("HomeSettingScreen");
    } else {
      // console.log(response)
      Alert.alert("Change Password Failed", `${response.message}`, [
        { text: "Ok" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Change Password</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={{ alignItems: "center" }}>
          <ScrollView style={styles.scrollview}>
            <View style={styles.gr_textbut}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    // color: colors.text,
                    marginTop: 50,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather
                  name="lock"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  // secureTextEntry={data.secureTextEntry ? true : false}
                  style={[
                    styles.textInput,
                    {
                      // color: colors.text
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
              </View>
              {data.isPasswordOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password Invalid</Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.gr_textbut}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    // color: colors.text,
                    marginTop: 10,
                  },
                ]}
              >
                New Password
              </Text>
              <View style={styles.action}>
                <Feather
                  name="lock"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  placeholder="Your New Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[
                    styles.textInput,
                    {
                      // color: colors.text
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleNewPasswordChange(val)}
                />
              </View>
              {data.isNewPasswordOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>New Password Invalid</Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.gr_textbut}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    // color: colors.text,
                    marginTop: 10,
                  },
                ]}
              >
                Confirm New Password
              </Text>
              <View style={styles.action}>
                <Feather
                  name="lock"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  placeholder="Confirm New Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[
                    styles.textInput,
                    {
                      // color: colors.text
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleConfirmNewPasswordChange(val)}
                />
              </View>
              {/* {data.isConfirmNewPasswordOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Confirm New Password Invalid
                  </Text>
                </Animatable.View>
              )} */}
              {data.isConfirmMapWithNewPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Confirm New Password Not Map With New Password
                  </Text>
                </Animatable.View>
              )}
            </View>

            <TouchableOpacity
              // onPress={() => { loginHandle(data.username, data.password) }}
              disabled={
                !data.isPasswordOK ||
                !data.isNewPasswordOK ||
                !data.isConfirmMapWithNewPassword ||
                !data.isConfirmMapWithNewPassword
              }
              // onPress={() => navigation.navigate("SignIn")}
              style={[
                styles.button_ac,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 50,
                },
              ]}
              onPress={handleSubmitChangePassword}
            >
              <Text
                style={[
                  styles.textChangePassword,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Change Password
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#009387",
  },
  scrollview: {
    width: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    // paddingHorizontal: 20,
    // paddingBottom: 0,
    alignItems: "center",
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
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
  textInput: {
    flex: 1,
    // marginTop: Platform.OS = 'ios' ? -13 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  button_ac: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textChangePassword: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  gr_textbut: {
    marginBottom: 25,
  },
});
