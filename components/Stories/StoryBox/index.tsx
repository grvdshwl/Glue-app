import React from "react";
import { Box, Image, Pressable, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

interface Story {
  name: string;
  userImage: string;
  statusImages: {
    name: string;
    image: string;
  }[];
}

interface StoryBoxProps {
  story: Story;
}

const StoryBox: React.FC<StoryBoxProps> = ({ story }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Status", {
      story: story,
    });
  };

  return (
    <Pressable
      sx={{
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
      onPress={handlePress}
    >
      <Box
        sx={{
          borderWidth: 2.5,
          padding: 3,
          borderRadius: 50,
          borderColor: "$red500",
        }}
      >
        <Image
          source={{ uri: story.userImage }}
          alt={story.name}
          sx={{
            borderRadius: 40,
            width: 75,
            height: 75,
            objectFit: "cover",
          }}
        />
      </Box>
      <Text sx={{ textAlign: "center", color: "#000" }}>{story.name}</Text>
    </Pressable>
  );
};

export default StoryBox;
