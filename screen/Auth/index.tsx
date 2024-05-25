import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Auth;
