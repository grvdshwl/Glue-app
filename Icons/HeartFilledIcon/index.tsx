import { AntDesign } from "@expo/vector-icons";
import React from "react";

const HeartFilledIcon = ({ color = "red" }) => (
  <AntDesign name="heart" size={24} color={color} />
);

export default HeartFilledIcon;
