import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { Avatar, Title, Caption, Paragraph } from "react-native-paper";
import LogoutButton from "../../../components/LogoutButton/index";
import authAPI from "../../../apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import {
  changeLoadingState,
  saveAccessToken,
  saveSignedInUser,
} from "../../../redux/actions/auth";

function SettingScreen({ navigation }) {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  //   const [userInfo, setUserInfo] = useState(null);
  //   useEffect(() => {
  //     setUserInfo(currentUser);
  //   }, [currentUser]);
  console.log(accessToken)
  const handleLogoutClick = async () => {
    authAPI
      .logout(accessToken)
      .then((res) => {
        dispatch(
          saveAccessToken({
            accessToken: null,
            refreshToken: null,
            expirationTime: null,
            currentUser: null,
          })
        );
        navigation.navigate("SignIn");
      })
      .catch((err) => {
        dispatch(
          saveAccessToken({
            accessToken: null,
            refreshToken: null,
            expirationTime: null,
            currentUser: null,
          })
        );
        navigation.navigate("SignIn");
      });
  };


  return (
    <View style={styles.container}>
      {currentUser !== null && (
        <ScrollView style={styles.scrollview}>
          <View style={styles.header}>
            <View style={styles.account_i}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png",
                  }}
                  size={60}
                  style={styles.imageStyle}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{currentUser.fullName}</Title>
                  <Caption style={styles.caption}>{currentUser.email}</Caption>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    100
                  </Paragraph>
                  <Caption style={styles.caption}>Questions</Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    1000
                  </Paragraph>
                  <Caption style={styles.caption}>Point</Caption>
                </View>
              </View>
            </View>
            {/* <View style={styles.gr_button}>
                    <Button style={styles.button_css} title="Update Info" />
                    <Button title="Change Password" />
                    <Button title="Change Interest Topic" />
                    <Button title="Achievement" />
                </View> */}
            <TouchableOpacity
              style={styles.button_css}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Feather name="user-check" color="#fff" size={25} />
              <Text style={styles.button_text}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button_css}
              onPress={() => navigation.navigate("ChangePasswordScreen")}
            >
              <Feather name="shield" color="#fff" size={25} />
              <Text style={styles.button_text}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button_css}
              onPress={() => navigation.navigate("ChangeInterestTopicScreen")}
            >
              <Feather name="bookmark" color="#fff" size={25} />
              <Text style={styles.button_text}>Change Interest Topic</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button_css}
              onPress={() => navigation.navigate("AchievementScreen")}
            >
              <Feather name="award" color="#fff" size={25} />
              <Text style={styles.button_text}>Achievement</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <View style={styles.footer}>
        <LogoutButton
          style={styles.button}
          handleLogoutClick={handleLogoutClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#009387",
    width: "100%",
  },
  scrollview: {
    // width: '100%'
  },
  header: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingBottom: 0,
    // backgroundColor: "green",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  footer: {
    flex: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    // backgroundColor: "blue"
    paddingBottom: 80,
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
  button_css: {
    alignItems: "flex-start",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 15,
    width: "100%",
    height: 70,
    justifyContent: "center",
    borderRadius: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
    color: "#fff",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#fff",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
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
  account_i: {
    justifyContent: "flex-start",
    paddingBottom: 30,
    paddingTop: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    // textAlign: 'center'
    marginLeft: 30,
    //, marginBottom: 10
  },
  imageStyle: {
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    // marginTop: 50
    marginBottom: 100,
  },
});

export default SettingScreen;
