import {
  Box,
  Image,
  ImageBackground,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

import ProgressBar from "../../components/ProgressBar";

interface StatusScreenProps {
  userStory: any;
  scrollToNext: any;
  isCurrentIndex: boolean;
}

const StatusStory: React.FC<StatusScreenProps> = ({
  userStory,
  scrollToNext,
  isCurrentIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { name, userImage, statusImages } = userStory;

  useEffect(() => {
    if (isCurrentIndex) {
      const timeoutId = setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % statusImages.length;
        setCurrentImageIndex(nextIndex);
        if (nextIndex === 0) {
          scrollToNext();
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentImageIndex, statusImages, isCurrentIndex]);

  return (
    <ImageBackground
      source={{ uri: statusImages[currentImageIndex].image }}
      sx={{ flex: 1, position: "relative", zIndex: 10 }}
    >
      <Box
        sx={{
          flexDirection: "row",
          gap: 2,
          marginTop: 8,
          paddingHorizontal: 8,
        }}
      >
        {statusImages.map((_: any, index: number) => (
          <ProgressBar
            key={index}
            currentIndex={currentImageIndex}
            index={index}
            startProgress={isCurrentIndex}
          />
        ))}
      </Box>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Box sx={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Image
            source={{ uri: userImage }}
            sx={{ width: 50, height: 50, borderRadius: 25 }}
            alt={name}
          />
          <Text sx={{ color: "#fff" }}>{name}</Text>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default StatusStory;
