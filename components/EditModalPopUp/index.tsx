import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import usePosts from "../../hooks/usePosts";
import {
  Box,
  Pressable,
  Text,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface CommentPopUpProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

const EditModalPopUp: React.FC<CommentPopUpProps> = ({
  isVisible,
  setIsVisible,
  data,
}) => {
  const { user: currentUser, refetchUserPosts } = useContext(AppContext);
  const { id } = data;
  const { editPostCaption, loading } = usePosts(id, currentUser);
  const [comment, setComment] = useState(data.caption);

  const toggleMenu = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    if (comment.length < 2) {
      alert("Please provide a post caption");
      return;
    }
    editPostCaption(comment);
    toggleMenu();
    setTimeout(refetchUserPosts, 2000);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Box style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Box style={styles.commentBox}>
        <Box style={styles.menu}>
          <Text sx={{ fontSize: 16, fontWeight: "$bold", color: "#262626" }}>
            Please edit your post caption
          </Text>
          <Textarea>
            <TextareaInput
              style={{
                padding: 12,
                flex: 1,
              }}
              placeholder="Enter your comment"
              value={comment}
              maxLength={200}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
          </Textarea>
          <Pressable sx={styles.button} onPress={handleSubmit}>
            {!loading ? (
              <Text sx={{ color: "#FFF", textAlign: "center" }}>Submit</Text>
            ) : (
              <AnimatedSpinner color="#FFF" size="sm" />
            )}
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  commentBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -160 }, { translateY: -100 }],
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: 320,
    height: 250,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 16,
  },
  menu: { display: "flex", flexDirection: "column", gap: 12, width: "100%" },
  menuItem: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#262626",
    padding: 12,
  },
});

export default EditModalPopUp;
