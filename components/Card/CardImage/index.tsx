import { Image } from "@gluestack-ui/themed";
import React from "react";
import { useWindowDimensions } from "react-native";

interface CardImageProps {
  alt: string;
  image: string;
}

const CardImage: React.FC<CardImageProps> = ({ alt, image }) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <Image
      source={{ uri: image }}
      alt={alt}
      style={{
        flex: 1,
        resizeMode: "cover",
        height: screenWidth > 450 ? 650 : 400,
        width: screenWidth,
      }}
    />
  );
};

export default CardImage;
