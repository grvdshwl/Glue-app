import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../Icons/BackButton";
import { AppContext } from "../../context";
import {
  fetchBlobFromUri,
  fetchBlobFromUriList,
  generateUUID,
} from "../../utils/helper";
import useCreatePost from "../../hooks/useCreatePost";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";
const NewPost: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useContext(AppContext);
  const {
    params: { uriList = [] },
  } = useRoute();
  const [location, setLocation] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const handleLocationChange = (text: string) => setLocation(text);
  const handleCaptionChange = (text: string) => setCaption(text);
  const { createPost, loading } = useCreatePost();

  const postImage = async () => {
    const blobList = await fetchBlobFromUriList(uriList);
    const finalPost = {
      id: generateUUID(),
      caption,
      location,
      userId: user.uid,
      user: user,
      likes: [],
      comments: [],
    };

    createPost(finalPost, blobList, user.uid).then(() => {
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
      }, 4000);
    });
  };

  return (
    <Box sx={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <BackButton />
      </Pressable>
      <Box sx={styles.imageContainer}>
        {uriList.map((img) => (
          <Image
            key={img}
            source={{ uri: img }}
            sx={styles.image}
            alt="Uploaded-image"
          />
        ))}
      </Box>
      <Textarea sx={styles.textarea}>
        <TextareaInput
          placeholder="Write a caption..."
          onChangeText={handleCaptionChange}
          value={caption}
        />
      </Textarea>
      <Box sx={styles.inputContainer}>
        <Text sx={styles.label}>Add Location</Text>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Enter Location here"
            value={location}
            onChangeText={handleLocationChange}
          />
        </Input>
      </Box>
      <Box>
        <Button onPress={postImage}>
          {!loading ? (
            <Text sx={styles.buttonText}>Post</Text>
          ) : (
            <AnimatedSpinner color="#fff" />
          )}
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: { padding: 12, flexDirection: "column", gap: 12 },
  imageContainer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  image: { width: 110, height: 110, objectFit: "cover" },
  textarea: {
    width: "100%",
    flexShrink: 1,
    borderWidth: 1,
    padding: 12,
  },
  inputContainer: { gap: 8, borderColor: "#c2c2c2" },
  label: { color: "#000", fontWeight: "600" },
  buttonText: { color: "#fff" },
};

export default NewPost;
