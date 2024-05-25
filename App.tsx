import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { View, StyleSheet } from "react-native";
import AppProvider from "./components/AppProvider";
import InstaApp from "./screen/InstaApp";
import Toast from "react-native-toast-message";
import AnimatedSpinner from "./Animation/AnimatedSpinner";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <AnimatedSpinner color="#339af0" size="xl" />
      </View>
    );
  }

  return (
    <AppProvider>
      <InstaApp />
      <Toast position="bottom" />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
