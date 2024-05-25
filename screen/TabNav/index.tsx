import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";

import { Box } from "@gluestack-ui/themed";
import Home from "../Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Profile";
import Likes from "../Likes";
import Search from "../Search";
import HeartFilledIcon from "../../Icons/HeartFilledIcon";
import HeartOutLineIcon from "../../Icons/HeartOutlineIcon";
import { HomeIcon, HomeOutLineIcon } from "../../Icons/HomeIcon";
import SearchIcon, { SearchOutLineIcon } from "../../Icons/SeachIcon";
import { UserIcon, UserOutLineIcon } from "../../Icons/User";
import { AddCircle, AddCircleOutline } from "../../Icons/AddCircle";
import AddPost from "../AddPost";
import { useContext } from "react";
import { AppContext } from "../../context";
import useUserData from "../../hooks/useUserData";

const Tab = createBottomTabNavigator();
const TabNav = () => {
  const { user, handleUser, resetContext } = useContext(AppContext);

  const updatedUser = useUserData(user.uid);

  useEffect(() => {
    if (updatedUser) {
      handleUser(updatedUser);
    }
  }, [updatedUser]);

  useEffect(() => {
    return () => {
      resetContext();
    };
  }, []);

  return (
    <Box sx={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "rgba(0,0,0,0.75)",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <HomeIcon color={color} />
              ) : (
                <HomeOutLineIcon color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <SearchIcon color={color} />
              ) : (
                <SearchOutLineIcon color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPost}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <AddCircle color={color} />
              ) : (
                <AddCircleOutline color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Likes"
          component={Likes}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <HeartFilledIcon color={color} />
              ) : (
                <HeartOutLineIcon color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <UserIcon color={color} />
              ) : (
                <UserOutLineIcon color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </Box>
  );
};
export default TabNav;
