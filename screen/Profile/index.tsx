import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UserProfile from "../../components/UserProfile";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const Profile = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const resetAction = navigation.navigate("MyProfile" as never);
      navigation.dispatch(resetAction as any);
    }, [navigation])
  );

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default Profile;
