import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export const UserOutLineIcon = ({ color = "black" }) => (
  <FontAwesome name="user-o" size={24} color={color} />
);

export const UserIcon = ({ color = "black" }) => (
  <FontAwesome name="user" size={24} color={color} />
);
