import React from "react";
import { Box, Image, Pressable, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
interface PostImage {
  id: string;
  user: string;
  images: { url: string; alt: string }[];
  caption: string;
  location: string;
}

interface ProfileGridProps {
  postImages: PostImage[];
  isLoading: boolean;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ postImages, isLoading }) => {
  const navigation: any = useNavigation();
  const { width: screenWidth } = useWindowDimensions();
  if (!postImages.length && !isLoading) {
    return (
      <Box sx={{ marginTop: 56 }}>
        <Text sx={{ fontSize: 20, fontWeight: "500", color: "#262626" }}>
          No Posts Found!
        </Text>
      </Box>
    );
  }

  const handlePress = (item: PostImage) => {
    navigation.navigate("PostUser", {
      postData: {
        user: item.user,
        id: item.id,
        images: item.images,
        caption: item.caption,
        location: item.location,
        comments: item.comments,
      },
    });
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 52,
        gap: 8,
      }}
    >
      {postImages.map((item) => (
        <Pressable key={item.id} onPress={() => handlePress(item)}>
          <Image
            source={{ uri: item.images[0].url }}
            sx={{
              height: 120,
              flexShrink: 1,
              width: 120,
              objectFit: "cover",
            }}
            alt={item.images[0].alt}
          />
        </Pressable>
      ))}
    </Box>
  );
};

export default ProfileGrid;
