import React from "react";
import { Platform } from "react-native";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";

const AnimatedSpinner = ({
  size = "md",
  color = "#339af0",
  style = {},
}: {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  style?: any;
}) => {
  // Define sizes based on the variants
  const sizeVariants: { [key: string]: number } = {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  };

  // Get the size based on the variant or default to md
  const spinnerSize = sizeVariants[size] || sizeVariants["md"];

  return (
    <MotiView
      from={{
        rotate: "0deg",
      }}
      animate={{
        rotate: "360deg",
      }}
      transition={{
        type: "timing",
        duration: 800,
        repeat: Infinity,
        repeatReverse: false,
        easing: Easing.linear,
      }}
      style={[
        style,
        {
          backgroundColor: "transparent",
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: spinnerSize / 10,
          borderRadius: spinnerSize / 2,
          borderColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 5,
          borderBottomColor: "transparent",
          alignSelf: "center",
          ...(Platform.OS === "android" && { borderBottomWidth: 0 }),
        },
      ]}
    />
  );
};

export default AnimatedSpinner;
