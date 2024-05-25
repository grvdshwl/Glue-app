import { Box, Button, Image, Text } from "@gluestack-ui/themed";
import React from "react";
import { googleIconLink } from "../../utils/link";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface GoogleLoginButtonProps {
  onPress: () => void;
  googleLoading: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onPress,
  googleLoading,
}) => {
  return (
    <Button
      style={{
        backgroundColor: "transparent",
        borderWidth: 1,
        gap: 8,
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {!googleLoading ? (
        <Box style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
          <Image
            source={{
              uri: googleIconLink,
            }}
            style={{ width: 25, height: 25, resizeMode: "contain" }}
            alt="google-icon"
          />
          <Text style={{ color: "#339af0", fontWeight: "600" }}>
            Login With Google
          </Text>
        </Box>
      ) : (
        <AnimatedSpinner color="#339af0" />
      )}
    </Button>
  );
};

export default GoogleLoginButton;
