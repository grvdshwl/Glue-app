import { Box, Icon, MoonIcon, Pressable, Text } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import CameraIcon from "../../Icons/CameraIcon";
import SendIcon from "../../Icons/SendIcon";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigator = useNavigation();
  const handleCameraPress = () => {
    navigator.navigate("Camera" as never);
  };
  return (
    <Box style={styles.container}>
      <Pressable onPress={handleCameraPress}>
        <Icon as={CameraIcon} />
      </Pressable>
      <Text style={styles.title}>Instagram</Text>
      <Icon as={SendIcon} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  title: {
    fontSize: 28,
    paddingTop: 20,
    fontWeight: "600",
    fontFamily: "Pacifico-Regular",
    color: "#262626",
  } as TextStyle,
});

export default Header;
