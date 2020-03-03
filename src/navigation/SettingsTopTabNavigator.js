import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Plus from "../screens/Plus";
import Profil from "../screens/Profil";

const Tab = createMaterialTopTabNavigator();

export default function SettingsTopTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Plus" component={Plus} />
    </Tab.Navigator>
  );
}
