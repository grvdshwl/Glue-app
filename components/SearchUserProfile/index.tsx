import React, { useEffect, useState } from "react";
import DisplayProfile from "../DisplayProfile";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../Icons/BackButton";
import { Box, Pressable } from "@gluestack-ui/themed";
import useUserData from "../../hooks/useUserData";

const SearchUserProfile = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { userData } = params as { userData: any };

  const [data, setData] = useState(userData);
  const updatedUser = useUserData(data.uid);

  useEffect(() => {
    if (updatedUser) {
      setData(updatedUser);
    }
  }, [updatedUser]);

  return (
    <Box sx={{ padding: 16 }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackButton />
      </Pressable>
      <DisplayProfile user={data} />
    </Box>
  );
};

export default SearchUserProfile;
