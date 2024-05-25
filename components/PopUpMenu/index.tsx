import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContext } from "../../context";
import { useNavigation, useRoute } from "@react-navigation/native";
import usePosts from "../../hooks/usePosts";

interface PopupMenuProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setShowEdit: any;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  isVisible,
  setIsVisible,
  data,
  setShowEdit,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user: currentUser, refetchUserPosts } = useContext(AppContext);
  const { id } = data;
  const { deletePost } = usePosts(id, currentUser);
  const toggleMenu = () => {
    setIsVisible((prev) => !prev);
  };

  const handleDelete = () => {
    if (currentUser.uid === data.user.uid) {
      deletePost().then(() => {
        refetchUserPosts();
      });
      setIsVisible(false);

      if (route.name !== "Feed") {
        navigation.goBack();
      }
    } else {
      alert("Cannot delete a post for other user!");
    }
  };
  const handleEdit = () => {
    setIsVisible(false);
    setShowEdit(true);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.menu}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={[styles.menuItem, { color: "red" }]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.menuItem}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.menuItem}>Share</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -100 }],
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 16,
  },
  menuItem: {
    fontSize: 18,
  },
});

export default PopupMenu;
