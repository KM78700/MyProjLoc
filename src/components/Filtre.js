import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../styles";

//-- Icônes
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

const Filtre = props => {
  //-- Destructuring props
  const { title1, title2, service, color } = props;

  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        borderColor: "lightgray",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 2,
        marginRight: 2
      }}
      // onPress={}
    >
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <Entypo
          style={{
            paddingTop: 10,
            textAlign: "center"
          }}
          color={color}
          name={service}
          size={22}
        />
        <Text
          style={{
            paddingTop: 8,
            fontSize: 12,
            textAlign: "center",
            color: "#909090"
          }}
        >
          {title1}
        </Text>
        <Text
          style={{
            paddingBottom: 8,
            fontSize: 12,
            textAlign: "center",
            color: "#909090"
          }}
        >
          {title2}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Filtre;
