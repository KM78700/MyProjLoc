import React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ServicesBar = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Entypo style={{ marginRight: 5 }} name="key" size={20} />
      <Entypo style={{ marginRight: 5 }} name="trash" size={20} />
      <Entypo style={{ marginRight: 5 }} name="tools" size={20} />
    </View>
  );
};

export default ServicesBar;
