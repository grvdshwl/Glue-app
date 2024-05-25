import { Box } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface ProgressBarProps {
  currentIndex: number;
  index: number;
  startProgress: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  index,
  startProgress,
}) => {
  let initialValue = currentIndex > index ? 1 : 0;
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (startProgress && currentIndex === index) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else {
      if (currentIndex > index) {
        animatedValue.setValue(1);
      } else {
        animatedValue.setValue(0);
      }
    }
  }, [currentIndex, index, startProgress]);

  const interpolatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Box style={styles.container}>
      <Animated.View style={[styles.progress, { width: interpolatedWidth }]} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  progress: { height: "100%", backgroundColor: "rgba(255,255,255,1)" },
});

export default ProgressBar;
