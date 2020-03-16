import React from "react";
import { View } from "react-native";
import styles from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

//--- Icones
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

export default Star = props => {
  return (
    <Entypo
      name={props.filled === true ? "star" : "star-outlined"}
      // name="star"
      color="#FFB402"
      size={50}
      style={{ margin: 8, paddingVertical: 15 }}
    />
  );
};
