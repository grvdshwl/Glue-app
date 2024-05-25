import { Feather } from "@expo/vector-icons";
import React from "react";

export const EyeIcon = ({ color = "black" }) => {
  return <Feather name="eye" size={28} color={color} />;
};

export const EyeOffIcon = ({ color = "black" }) => {
  return <Feather name="eye-off" size={28} color={color} />;
};
