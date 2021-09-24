import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const RequestSubjectScreen = ({ }) => {
  const { requestSubjectTouched } = useSelector(
    (state) => state.subjectReducer
  );
  const [bc, setBc] = useState();

  useEffect(() => {
    if (requestSubjectTouched.statusName === "Waiting") {
      setBc("#70c1f8");
    } else if (requestSubjectTouched.statusName === "Denine") {
      setBc("red");
    } else if (requestSubjectTouched.statusName === "Approved") {
      setBc("green");
    }
  }, []);

  console.log(requestSubjectTouched);
  return (
    <View style={{ justifyContent: "center", flex: 1, backgroundColor: bc }}>
      <View style={{ flex: 1, backgroundColor: bc }}>
        {/* <Text>Header will change color with status request</Text> */}
      </View>
      <View
        style={{
          flex: 7,
          marginHorizontal: 5,
          // marginVertical: 5,
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 15,
        }}
      >
        <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Text style={{ fontSize: 15, flex: 4 }}>Subject: </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                flex: 6,
              }}
            >
              {requestSubjectTouched.subjectName}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Text style={{ fontSize: 15, flex: 4 }}>Request To: </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                flex: 6,
              }}
            >
              {requestSubjectTouched.requestTo}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Text style={{ fontSize: 15, flex: 4 }}>Request Content: </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                flex: 6,
              }}
            >
              Request to join the subject: {requestSubjectTouched.subjectName}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Text style={{ fontSize: 15, flex: 4 }}>Requested At: </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                flex: 6,
              }}
            >
              {Moment(requestSubjectTouched.requestedAt).format("YYYY-MM-DD")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <Text style={{ fontSize: 15, flex: 4 }}>Status: </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "bold",
                flex: 6,
              }}
            >
              {requestSubjectTouched.statusName}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <TouchableOpacity
          // onPress={() => { loginHandle(data.username, data.password) }}
          disabled={requestSubjectTouched.statusName !== "Waiting"}
          style={[
            styles.button_ac,
            {
              borderColor: "pink",
              borderRadius: 10,
              borderWidth: 3,
              // marginTop: 30,
              backgroundColor: "white",
              marginHorizontal: 50,
              height: 80,
              justifyContent: "center",
            },
          ]}
        // onPress={}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "pink",
              textAlign: "center",
            }}
          >
            Cancel Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    // backgroundColor: "#c3c3c3",
  },
  textSt: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    flex: 4,
  },
});
