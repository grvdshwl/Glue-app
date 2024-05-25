import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";

const CameraIcon = () => <Feather name="camera" size={28} color="black" />;

export const CameraReverseIcon = ({ color = "black" }) => (
  <Ionicons name="camera-reverse" size={28} color={color} />
);

export default CameraIcon;
