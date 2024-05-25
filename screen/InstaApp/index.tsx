import React from "react";
import { Box } from "@gluestack-ui/themed";
import { useContext } from "react";
import { AppContext } from "../../context";
import Auth from "../Auth";
import MainAppStack from "../MainAppStack";

const InstaApp = () => {
  const { isAuthenticated, user } = useContext(AppContext);
  return (
    <Box style={{ flex: 1 }}>
      {!!isAuthenticated && !!user ? <MainAppStack /> : <Auth />}
    </Box>
  );
};
export default InstaApp;
