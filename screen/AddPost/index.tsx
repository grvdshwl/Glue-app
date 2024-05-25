import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectGallery from "../../components/SelectGallery";
import NewPost from "../../components/NewPost";
import React from "react";

const Stack = createNativeStackNavigator();
const AddPost = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectGallery" component={SelectGallery} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};
export default AddPost;
