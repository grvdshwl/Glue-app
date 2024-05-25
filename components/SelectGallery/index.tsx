import React, { useState } from "react";
import { View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const SelectGallery: React.FC = () => {
  const navigation = useNavigation();

  const getPermission = async (): Promise<boolean> => {
    if (Constants.platform?.ios) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need permissions to make this work!");
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    const permissionGranted = await getPermission();
    if (!permissionGranted) return;

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
        allowsMultipleSelection: true,
      });

    if (!result?.canceled && result?.assets.length) {
      const uriList = result?.assets?.map((asset) => asset.uri);
      navigation.navigate("NewPost", { uriList: uriList });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

export default SelectGallery;
