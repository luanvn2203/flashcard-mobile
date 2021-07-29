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

import { RadioButton } from "react-native-paper";
import topicAPI from "../../../apis/topic.api";
import authAPI from "../../../apis/auth.api";
import { saveSignedInUser } from "../../../redux/actions/auth";

const ChangeInterestTopicScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state) => state.authReducer);
  const { accessToken } = useSelector((state) => state.authReducer);
  const [listTopic, setListTopic] = useState([]);

  const dispatch = useDispatch();

  const [interestTopicThis, setInterestTopicThis] = useState([
    // JSON.parse(currentUser.interestTopic),
  ]);

  //   console.log(currentUser.interestTopic);

  //   const [data, setData] = React.useState({
  //     interestTopic: [""],
  //   });

  const getData = async () => {
    console.log(JSON.parse(currentUser.interestTopic));
    const newList = JSON.parse(currentUser.interestTopic).map((elem) =>
      parseInt(elem, 10)
    );
    console.log(newList);
    setInterestTopicThis(newList);
    const res = await topicAPI.getAllTopic();
    // console.log(res);
    const items = [
      {
        name: "Topics",
        id: 0,
        children: [],
      },
    ];
    if (res.listTopic.length > 0) {
      const listTop = res.listTopic;
      for (let index = 0; index < listTop.length; index++) {
        const item = {
          name: listTop[index].topicName,
          id: listTop[index].topicId,
        };
        items[0].children.push(item);
      }
      setListTopic(items);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInterestTopicChange = (val) => {
    // console.log(val);
    setInterestTopicThis(val);
    // setData({
    //     ...data,
    //     interestTopic: val,
    // })
  };

  const handleSaveInterestTopic = async () => {
    console.log(interestTopicThis);
    const respones = await authAPI.updateHobbyTopic(
      {
        interestTopic: interestTopicThis,
      },
      accessToken
    );
    // console.log(respones);
    if (respones.status === "Success") {
      const myInfo = await authAPI.getMe(accessToken);
      // console.log(myInfo);
      dispatch(saveSignedInUser(myInfo.account));
      Alert.alert("Update Interest Success", `${respones.message}`, [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Update Interest Topic Failed", `${respones.message}`, [
        { text: "Ok" },
      ]);
    }
  };

  // console.log(interestTopicThis);
  // console.log(listTopic);
  // console.log(JSON.parse(currentUser.interestTopic));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Change Interest Topic screen</Text>
      {listTopic.length > 0 && (
        <View>
          {currentUser && (
            <SectionedMultiSelect
              items={listTopic}
              IconRenderer={Icon}
              uniqueKey="id"
              subKey="children"
              selectText="Pick your favourite topic"
              searchPlaceholderText="Search favourite topic"
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={handleInterestTopicChange}
              selectedItems={interestTopicThis}
            />
          )}
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.signIn,
          {
            borderColor: "#009387",
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
        onPress={handleSaveInterestTopic}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: "#009387",
            },
          ]}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeInterestTopicScreen;

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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});
