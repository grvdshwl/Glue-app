import React from "react";
import { Box, Image, Pressable, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

const SearchCard: React.FC<{ data: any }> = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      sx={{
        flexDirection: "row",
        gap: 12,
        flex: 1,
      }}
      onPress={() => {
        navigation.navigate("UserProfile", { userData: data });
      }}
    >
      <Box>
        <Image
          source={{ uri: data.profilePicUrl }}
          alt={data.fullName}
          sx={{ width: 75, height: 75, borderRadius: 40 }}
        />
      </Box>
      <Box sx={{ gap: 4, marginTop: 4 }}>
        <Text
          sx={{
            flexWrap: "wrap",
            color: "#000",
            fontWeight: "600",
          }}
        >
          {data.fullName}
        </Text>
        <Text
          sx={{
            flexWrap: "wrap",
            color: "#262626",
            fontWeight: "500",
            opacity: 0.8,
          }}
        >
          {data.bio}
        </Text>
      </Box>
    </Pressable>
  );
};

export default SearchCard;
