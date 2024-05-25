import React, { useContext } from "react";

import { AppContext } from "../../context";

import DisplayProfile from "../DisplayProfile";
import { Box } from "@gluestack-ui/themed";

const UserProfile = () => {
  const { user } = useContext(AppContext);

  return (
    <Box sx={{ padding: 16 }}>
      <DisplayProfile user={user} />
    </Box>
  );
};

export default UserProfile;
