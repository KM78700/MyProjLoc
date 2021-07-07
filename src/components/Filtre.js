import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

//-- Icônes
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

const Filtre = props => {
  const { title1, title2, service, color } = props;

  const [isFiltreColor, setIsFiltreColor] = useState(true);
  
  const [backColor, setBackColor] = useState("white");
  const [textColor, setTextColor] = useState("black");

  const checkFiltreColor = () => {
    if (isFiltreColor) {
      setBackColor("#d4e6f1");
      setTextColor("black");
    } else if (isFiltreColor) {
      setBackColor("#d4e6f1");
      setTextColor("black");
      alert("screen filtre");
    } else {
      setBackColor("white");
      setTextColor("black");
    }
    setIsFiltreColor(!isFiltreColor);
  };

  return (
    <TouchableOpacity
      style={{
        borderWidth: 1.5,
        borderColor: "lightgray",
        backgroundColor: backColor,
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 2,
        marginRight: 2
      }}
      onPress={checkFiltreColor}
    >
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <Entypo
          style={{
            paddingTop: 8,
            textAlign: "center"
          }}
          color={color}
          name={service}
          size={20}
        />
        <Text
          style={{
            paddingTop: 2,
            paddingBottom: 8,
            fontSize: 12,
            textAlign: "center",
            color: textColor
          }}
        >
          {title1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Filtre;
