import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProcessQuizScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Process Quiz Screen</Text>
    </View>
  );
};

export default ProcessQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
