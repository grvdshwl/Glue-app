import { SafeAreaView } from "@gluestack-ui/themed";
import React from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, StatusBar, Text } from "@gluestack-ui/themed";
import { AppContextProvider } from "../../context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GluestackUIProvider config={config}>
      <AppContextProvider>
        <StatusBar barStyle="default" />
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </AppContextProvider>
    </GluestackUIProvider>
  );
};

export default AppProvider;
