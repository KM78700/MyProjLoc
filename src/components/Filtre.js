import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//import styles from "../../styles";

//-- Icônes
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

const Filtre = props => {
  const { title1, title2, service, color } = props;
  const [isFiltreColor, setIsFiltreColor] = useState(true);
  const [backColor, setBackColor] = useState("white");
  const [textColor, setTextColor] = useState("black");

  const checkFiltreColor = () => {
    if (isFiltreColor) {
      setBackColor("#ffc7bd");
      setTextColor("black");
    } else {
      setBackColor("white");
      setTextColor("black");
    }
    setIsFiltreColor(!isFiltreColor);
  };

  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
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
            color: textColor
          }}
        >
          {title1}
        </Text>
        <Text
          style={{
            paddingBottom: 8,
            fontSize: 12,
            textAlign: "center",
            color: textColor
          }}
        >
          {title2}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Filtre;

// styles = StyleSheet.create({
//   container: {
//     borderWidth: 0.5,
//     borderColor: "lightgray",
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginTop: 8,
//     marginBottom: 8,
//     marginLeft: 2,
//     marginRight: 2
//   }
// });
