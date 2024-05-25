import React from "react";
import { Box, Pressable, ScrollView } from "@gluestack-ui/themed";
import Card from "../Card";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../Icons/BackButton";

interface ProfilePostProps {
  route: any;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ route }) => {
  const { params } = useRoute();
  const { postData } = params as { postData: any };
  const navigation = useNavigation();

  return (
    <ScrollView sx={{ flex: 1 }}>
      <Pressable
        sx={{ padding: 8, marginBottom: 12 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackButton />
      </Pressable>
      <Card data={postData} />
    </ScrollView>
  );
};

export default ProfilePost;
