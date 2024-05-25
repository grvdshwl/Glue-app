import { Box, Text } from "@gluestack-ui/themed";
import React from "react";

interface CardCaptionProps {
  caption: string;
  likesCount: number;
}

const CardCaption: React.FC<CardCaptionProps> = ({ caption, likesCount }) => {
  return (
    <Box sx={{ paddingHorizontal: 12, gap: 2 }}>
      <Text sx={{ flexWrap: "wrap", fontSize: 16, color: "#000" }}>
        {caption}
      </Text>
      <Text
        sx={{
          marginRight: 12,
          fontSize: 16,
          color: "#000",
          fontWeight: "600",
          opacity: likesCount > 0 ? 1 : 0,
        }}
      >
        {likesCount} {likesCount > 1 ? "Likes" : "Like"}
      </Text>
    </Box>
  );
};

export default CardCaption;
