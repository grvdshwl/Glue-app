import React from "react";

import TabNav from "../TabNav";
import ProfilePost from "../../components/ProfilePost";
import CommentsScreen from "../../components/Card/CommentScreen";
import SearchUserProfile from "../../components/SearchUserProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NewPost from "../../components/NewPost";
import CameraModule from "../../components/CameraModule";

const Stack = createNativeStackNavigator();

const MainAppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeMain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeMain" component={TabNav} />
        <Stack.Screen name="PostUser" component={ProfilePost} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
        <Stack.Screen name="UserProfile" component={SearchUserProfile} />
        <Stack.Screen name="Camera" component={CameraModule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppStack;
