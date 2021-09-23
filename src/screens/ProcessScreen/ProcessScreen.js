import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const RecentScreen = ({}) => {
  const { recentLearningTouched } = useSelector(
    (state) => state.subjectReducer
  );

  console.log(recentLearningTouched);
  return (
    <View style={styles.container}>
      <Text>Recent Learning Screen</Text>
    </View>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
