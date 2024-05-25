import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SearchMain from "../../components/SearchMain";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Search: React.FC = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const resetAction = navigation.navigate("SearchMain" as never);
      navigation.dispatch(resetAction as any);
    }, [navigation])
  );

  return (
    <Stack.Navigator
      initialRouteName="SearchMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchMain" component={SearchMain} />
    </Stack.Navigator>
  );
};

export default Search;
