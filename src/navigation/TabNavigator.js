import * as React from "react";
import { View, Text, Button } from "react-native";

//--- Screens
import Home from "../screens/Home";
import Carte from "../screens/Carte";
import ChatList from "../screens/ChatList";
import Favoris from "../screens/Favoris";
import Plus from "../screens/Settings/Plus";
import SettingsTopTabNavigator from "./SettingsTopTabNavigator";
//--- Tabnavigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme } from "../constants/GlobalConstantes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName=""
      //--- screenOptions
      screenOptions={({ route }) => ({
        //--- TabBar
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Carte") {
            iconName = focused ? "map-marker" : "map-marker";
          } else if (route.name === "ChatList") {
            iconName = focused ? "comments" : "comments";
          } else if (route.name === "Favoris") {
            iconName = focused ? "heart" : "heart";
          } else if (route.name === "Plus") {
            iconName = focused ? "th-list" : "th-list";
          }
          return <FontAwesome name={iconName} size={26} color={color} />;
        }
      })}
      //--- tabOptions
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "#909090",
        style: {
          backgroundColor: Theme.buttonLabelColor,
          height: 60,
          paddingTop: 10,
          paddingBottom: 5
        }
      }}
    >
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Carte" component={Carte} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Favoris" component={Favoris} />
      <Tab.Screen name="Plus" component={SettingsTopTabNavigator} />
    </Tab.Navigator>
  );
};
