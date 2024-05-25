import React, { useState, useEffect } from "react";
import { Animated, Easing, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getRandomNumber } from "../../utils/helper";

interface AnimatedHeartProps {
  index: number;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ index }) => {
  const [position] = useState(new Animated.Value(index * -18));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(position, {
        duration: 1000,
        toValue: -getRandomNumber(300, 600),
        easing: Easing.ease,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getHeartStyle = (): ViewStyle => {
    return {
      transform: [
        {
          translateY: position,
        },
      ],
      opacity: opacity,
    };
  };

  return (
    <Animated.View
      style={[styles.container, getHeartStyle(), { left: index * 5 }]}
    >
      <AntDesign name="heart" size={28} color="red" style={styles.heart} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  heart: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimatedHeart;
