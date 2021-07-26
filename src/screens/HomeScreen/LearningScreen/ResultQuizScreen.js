import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCirCle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const ResultQuizScreen = ({
  // percentage = 75,
  radius = 100,
  strokenWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 0,
  // textColor,
  max = 100,
}) => {
  const { resultQuiz } = useSelector((state) => state.submitQuizReducer);
  console.log(resultQuiz);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const percentage = (resultQuiz.numOfCorrect / resultQuiz.totalQuestion) * 100;

  console.log(resultQuiz);

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  const halfCircle = radius + strokenWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = React.useRef();
  const inputRef = React.useRef();

  useEffect(() => {
    animation(percentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text:
            `${Math.round(resultQuiz.numOfCorrect)}` +
            "/" +
            `${Math.round(resultQuiz.totalQuestion)}`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage, resultQuiz]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <ScrollView style={styles.scrollview}>
          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 30 }}
          >
            <Text>Your Time: xxxxxx</Text>
          </View>
          <View>
            <Svg
              width={radius * 2}
              height={radius * 2}
              viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
              <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                <Circle
                  cx="50%"
                  cy="50%"
                  stroke={color}
                  strokeWidth={strokenWidth}
                  r={radius}
                  fill="transparent"
                  strokeOpacity={0.2}
                />
                <AnimatedCirCle
                  ref={circleRef}
                  cx="50%"
                  cy="50%"
                  stroke={color}
                  strokeWidth={strokenWidth}
                  r={radius}
                  fill="transparent"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleCircumference}
                  strokeLinecap="round"
                />
              </G>
            </Svg>
            <AnimatedInput
              ref={inputRef}
              underlineColorAndroid="transparent"
              editable={false}
              defaultValue="0"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  fontSize: radius / 2,
                  color: "tomato",
                },
                {
                  fontWeight: "900",
                  textAlign: "center",
                },
              ]}
            />
          </View>
          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}
          >
            <Text>
              Total core: {parseFloat(resultQuiz.totalCore).toFixed(2)}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={[
                styles.button_ac,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 10,
                  width: "100%",
                },
              ]}
            >
              <Text>View Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button_ac,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 20,
                },
              ]}
            >
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResultQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  button_ac: {
    // flex: 1,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
