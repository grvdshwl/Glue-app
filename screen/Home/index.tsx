import Feed from "../Feed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Status from "../Status";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CameraModule from "../../components/CameraModule";

const Stack = createNativeStackNavigator();
const Home = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const resetAction = navigation.navigate("Feed" as never);
      navigation.dispatch(resetAction as any);
    }, [navigation])
  );
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
};
export default Home;
