import React, { useContext, useState } from "react";
import LogoutModal from "../../Logout";
import EditProfileModal from "../../EditProfileModal";
import { AppContext } from "../../../context";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import useToast from "../../../hooks/useToast";
import { Box, Button, Text } from "@gluestack-ui/themed";

const DisplayProfileEdit: React.FC = () => {
  const [logoutModal, showLogoutModal] = useState(false);
  const [editModal, showEditModal] = useState(false);
  const { logoutUser } = useContext(AppContext);

  const [signOut] = useSignOut(auth);
  const showToast = useToast();

  const handleLogout = () => {
    showLogoutModal(false);

    signOut()
      .then(() => {
        setTimeout(logoutUser, 200);
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  };

  return (
    <Box
      style={{ display: "flex", flexDirection: "row", marginTop: 12, gap: 12 }}
    >
      <Button
        sx={{
          backgroundColor: "#339af0",
          padding: 8,
          borderRadius: 0,
          flex: 1,
        }}
        onPress={() => {
          showLogoutModal(true);
        }}
      >
        <Text sx={{ color: "white", fontWeight: "600" }}> Logout</Text>
      </Button>
      <Button
        sx={{
          backgroundColor: "#339af0",
          padding: 8,
          borderRadius: 0,
          flex: 1,
        }}
        onPress={() => {
          showEditModal(true);
        }}
      >
        <Text sx={{ color: "white", fontWeight: "600" }}>Edit Profile</Text>
      </Button>
      <LogoutModal
        visible={logoutModal}
        onClose={() => {
          showLogoutModal(false);
        }}
        onLogout={handleLogout}
      />
      <EditProfileModal
        visible={editModal}
        onClose={() => {
          showEditModal(false);
        }}
      />
    </Box>
  );
};

export default DisplayProfileEdit;
