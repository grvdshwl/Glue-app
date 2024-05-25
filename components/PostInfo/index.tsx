import React from "react";
import { Box, Image, Text } from "@gluestack-ui/themed";

interface LikesInfo {
  user: {
    name: string;
    userImage: string;
  };
  post: {
    user: string;
    image: string;
  };
}

const PostInfo: React.FC<{ info: LikesInfo }> = ({ info }) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <Box>
        <Image
          source={{ uri: info.user.userImage }}
          alt={info.user.name}
          sx={{ width: 80, height: 80, borderRadius: 50 }}
        />
      </Box>

      <Text
        sx={{
          flexWrap: "wrap",
          color: "#000",
          flexShrink: 1,
          marginTop: 12,
          fontWeight: "600",
        }}
      >
        {info.user.name} liked your Post.
      </Text>
      <Box>
        <Image
          source={{ uri: info.post.image }}
          alt={info.user.name}
          sx={{ width: 90, height: 90 }}
        />
      </Box>
    </Box>
  );
};

export default PostInfo;
