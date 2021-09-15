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

import { Picker } from "@react-native-picker/picker";

import * as Animatable from "react-native-animatable";

import SectionedMultiSelect from "react-native-sectioned-multi-select";

import { useDispatch, useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";

import authAPI from "../../../apis/auth.api";

import { RadioButton } from "react-native-paper";
import { saveSignedInUser } from "../../../redux/actions/auth";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authReducer);

  const [data, setData] = React.useState({
    email: currentUser.email,
    fullname: currentUser.fullName,
    phone: currentUser.phone,
    address: currentUser.address,
    gender: currentUser.gender,
    role: currentUser.roleId,
    dob: "",
    isValidFullname: true,
    isValidPhone: false,
    // emailOK: false,
    // passwordOK: false,
    fullnameOK: true,
    phoneOK: true,
    addressOK: true,
    dobOK: true,
  });

  const handleFullnameChange = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        fullname: val,
        isValidFullname: true,
        fullnameOK: true,
      });
    } else {
      setData({
        ...data,
        fullname: val,
        isValidFullname: false,
        fullnameOK: false,
      });
    }
  };

  const handlePhoneChange = (val) => {
    if (val.trim().length === 10) {
      setData({
        ...data,
        phone: val,
        isValidPhone: true,
        phoneOK: true,
      });
    } else {
      setData({
        ...data,
        phone: val,
        isValidPhone: false,
        phoneOK: false,
      });
    }
  };

  const handleAddressChange = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        address: val,
        addressOK: true,
      });
    } else {
      setData({
        ...data,
        address: val,
        addressOK: false,
      });
    }
  };

  const handleGenderChange = (val) => {
    setData({
      ...data,
      gender: val,
    });
  };

  const handleRoleChange = (val) => {
    // console.log("roleeee: " + val)
    setData({
      ...data,
      role: val,
    });
  };

  const oldDOB = currentUser.DOB;
  const dayInt = Date.parse(oldDOB);

  const today = new Date(dayInt);
  const [date, setDate] = useState(today);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    // console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleSubmitUpdateProfile = async () => {
    // console.log(data);
    // console.log(date);
    // console.log(interestTopicThis)
    const response = await authAPI.updateProfile(
      {
        email: data.email,
        fullName: data.fullname,
        roleId: data.role,
        phone: data.phone,
        address: data.address,
        DOB: `${date.toISOString()}`.slice(0, 10),
        gender: data.gender,
      },
      accessToken
    );
    console.log(date);
    console.log(response);
    if (response.status === "Success") {
      console.log(response);
      const myInfo = await authAPI.getMe(accessToken);
      console.log(myInfo);
      dispatch(saveSignedInUser(myInfo.account));
      Alert.alert("Update Profile Success", `${response.message}`, [
        { text: "OK" },
      ]);
      // setTimeout(() => {
      //     navigation.navigate("SignIn");
      // }, 2000);
      //   navigation.navigate("HomeSettingScreen");
    } else {
      // console.log(response);
      Alert.alert("Update Profile Failed", `${response.message}`, [
        { text: "Ok" },
      ]);
    }
  };

  //   console.log({Moment(date).format("YYYY-MM-DD")});

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/* <View style={styles.header}>
        <Text style={styles.text_header}>Profile</Text>
      </View> */}

      {currentUser !== null && (
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <ScrollView style={styles.scrollview}>
              {/* Email here */}
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>
                <Feather
                  name="mail"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  // placeholder="Your Email"
                  keyboardType="email-address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.email}
                  editable={false}
                // disable="true"
                //   onChangeText={(val) => handleEmailChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {/* {data.check_handleEmailChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null} */}
              </View>
              {/* {data.isValidUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Email is incorrect</Text>
                            </Animatable.View>
                        } */}
              {/* Password here */}

              {/* Fullname here */}
              <Text style={[styles.text_footer, { marginTop: 10 }]}>
                Fullname
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Fullname"
                  // keyboardType='email-address'
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.fullname}
                  onChangeText={(val) => handleFullnameChange(val)}
                />
              </View>
              {data.fullnameOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Fullname can not null</Text>
                </Animatable.View>
              )}
              {/* Phone Here */}
              <Text style={[styles.text_footer, { marginTop: 10 }]}>Phone</Text>
              <View style={styles.action}>
                <Feather
                  name="phone"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  placeholder="Your Phone Number"
                  keyboardType="numeric"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.phone}
                  onChangeText={(val) => handlePhoneChange(val)}
                />
              </View>
              {data.phoneOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Phone number must be 10 numbers
                  </Text>
                </Animatable.View>
              )}
              {/* Address here */}
              <Text style={[styles.text_footer, { marginTop: 10 }]}>
                Address
              </Text>
              <View style={styles.action}>
                <Feather
                  name="map-pin"
                  // color={colors.text}
                  size={20}
                />
                <TextInput
                  placeholder="Your Address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={data.address}
                  onChangeText={(val) => handleAddressChange(val)}
                />
              </View>
              {data.addressOK ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Address can not null</Text>
                </Animatable.View>
              )}
              {/* Dob here */}
              {/* <Text style={[styles.text_footer, { marginTop: 10 }]}>DOB</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Your dob"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => handleDOBChange(val)}
                            />
                        </View> */}

              <View>
                <Text style={[styles.text_footer, { marginTop: 10 }]}>
                  Date Of Birth
                </Text>
                <View style={styles.action}>
                  {/* <Feather
                    name="map-pin"
                    // color={colors.text}
                    size={20}
                  /> */}
                  <TextInput
                    // placeholder="Your Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={Moment(oldDOB).format("YYYY-MM-DD")}
                    editable={false}
                  // onChangeText={(val) => handleAddressChange(val)}
                  />
                </View>
                <View>
                  <Button
                    // style={styles.button_dob}
                    onPress={showDatepicker}
                    title="Pick your DOB"
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>

              {/* ///////// */}
              {/* Gender here */}
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <Text style={{ alignSelf: "center" }}>Male</Text>
                <RadioButton
                  style={{ flex: 1 }}
                  value="male"
                  status={data.gender === "male" ? "checked" : "unchecked"}
                  onPress={() => handleGenderChange("male")}
                />
                <Text style={{ alignSelf: "center" }}>Female</Text>
                <RadioButton
                  style={{ flex: 1 }}
                  value="female"
                  status={data.gender === "female" ? "checked" : "unchecked"}
                  onPress={() => handleGenderChange("female")}
                />
                <Text style={{ alignSelf: "center" }}>Other</Text>
                <RadioButton
                  style={{ flex: 1 }}
                  value="other"
                  status={data.gender === "other" ? "checked" : "unchecked"}
                  onPress={() => handleGenderChange("other")}
                />
              </View>
              {/* Role here */}
              <View>
                <Picker
                  selectedValue={data.role}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => handleRoleChange(itemValue)}
                >
                  {/* <Picker.Item label="Role..." /> */}
                  <Picker.Item label="User" value="1" />
                  <Picker.Item label="Donor" value="3" />
                </Picker>
              </View>
              {/* Favourite topic */}
              {/* Button action */}
              <TouchableOpacity
                // onPress={() => { loginHandle(data.username, data.password) }}
                disabled={
                  // !data.emailOK ||
                  // !data.passwordOK ||
                  !data.fullnameOK || !data.phoneOK || !data.addressOK
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
                onPress={handleSubmitUpdateProfile}
              >
                <Text
                  style={[
                    styles.textProfile,
                    {
                      color: "#009387",
                    },
                  ]}
                >
                  Update Profile
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

export default ProfileScreen;

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
    marginTop: 30,
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
  textProfile: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button_dob: {
    backgroundColor: "#fff",
    color: "red",
  },
});
