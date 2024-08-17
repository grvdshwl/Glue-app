import { Button, Text } from "@gluestack-ui/themed";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ReactChildren } from "react-native-toast-message";

interface FollowButtonProps {
  isFollowing: boolean;
  isLoading: boolean;
  onPress: () => void;
  children: ReactChildren;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  isLoading,
  onPress,
  children,
}) => {
  return (
    <Button
      style={[
        styles.button,
        {
          backgroundColor: isFollowing ? "transparent" : "#339af0",

          borderWidth: 1,
          borderColor: isFollowing ? "#339af0" : "#fff",
        },
      ]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={isFollowing ? "#339af0" : "#fff"} />
      ) : (
        <Text
          style={{
            color: isFollowing ? "#339af0" : "#fff",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {isFollowing ? "Following" : "Follow"}
        </Text>
      )}
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    width: 125,
    height: 40,
  },
});

export default FollowButton;
