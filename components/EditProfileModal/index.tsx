import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../../context";
import { Box, Image, Text } from "@gluestack-ui/themed";
import useUpdateProfileData from "../../hooks/useUpdateProfileData";
import { userProfileLink } from "../../utils/link";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import useUploadImage from "../../hooks/useUploadImage";
import { fetchBlobFromUri } from "../../utils/helper";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const { user, handleUser } = useContext(AppContext);
  const userProfileImage = user.profilePicUrl || userProfileLink;
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [bio, setBio] = useState<string>(user.bio);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateUserProfile } = useUpdateProfileData();
  const { uploadImage, loading } = useUploadImage();
  const [imageSource, setImageSource] = useState<string>(userProfileImage);

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
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result?.canceled) {
      const imageUri = result?.assets[0]?.uri;
      const blob = await fetchBlobFromUri(imageUri);
      const url = await uploadImage(user, blob);
      if (url) {
        setImageSource(url as string);
      }
    }
  };
  const handleFullNameChange = (text: string) => {
    setFullName(text);
  };

  const handleBioChange = (text: string) => {
    setBio(text);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedData = await updateUserProfile(user.uid, {
      fullName,
      bio,
      profilePicUrl: imageSource,
    });
    if (updatedData) {
      setIsLoading(false);
      handleUser(updatedData);
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            sx={{
              fontWeight: "600",
              fontSize: 20,
              textAlign: "center",
              color: "#262626",
            }}
          >
            Edit Profile
          </Text>
          <Box sx={{ gap: 12, alignItems: "center" }}>
            <Image
              source={{ uri: imageSource }}
              alt={user.fullName}
              sx={{ width: 100, height: 100, borderRadius: 75 }}
            />
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              {!loading ? (
                <Text style={styles.buttonText}>Edit Profile</Text>
              ) : (
                <AnimatedSpinner color="#fff" size="sm" />
              )}
            </TouchableOpacity>
          </Box>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={handleFullNameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your bio"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={handleBioChange}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {!isLoading ? (
                <Text style={styles.buttonText}>Submit</Text>
              ) : (
                <ActivityIndicator color="white" size="small" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    minWidth: "80%",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#339af0",
    padding: 8,
    minWidth: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditProfileModal;
