import React from "react";
import { FlatList } from "react-native";
import StoryBox from "./StoryBox";
import { Box } from "@gluestack-ui/themed";

interface Story {
  name: string;
  userImage: string;
  statusImages: {
    name: string;
    image: string;
  }[];
}

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <FlatList
      style={{
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e3e3e3",
      }}
      data={stories}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <StoryBox story={item} />}
      horizontal={true}
      ItemSeparatorComponent={() => <Box sx={{ width: 8 }} />}
    />
  );
};

export default Stories;
