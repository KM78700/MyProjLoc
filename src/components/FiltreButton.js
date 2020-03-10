import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

const FiltreButton = props => {
  const { caption, service, color, isGlobalFilter } = props;
  const [isFiltreColor, setIsFiltreColor] = useState(true);
  const [backColor, setBackColor] = useState("white");
  const [textColor, setTextColor] = useState("black");
  const navigation = useNavigation();
  const checkFiltreSelected = () => {
    if (!isGlobalFilter) {
      if (isFiltreColor) {
        setBackColor("#ffc7bd");
      } else {
        setBackColor("white");
      }
      setIsFiltreColor(!isFiltreColor);
    } else {
      navigation.navigate("Filter");
    }
  };
  const styles = StyleSheet.create({
    button: {
      borderWidth: 0.5,
      borderColor: "lightgray",
      backgroundColor: backColor,
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 2,
      marginRight: 2
    },
    container: {
      flexDirection: "column"
    },
    icon: {
      paddingTop: 10,
      textAlign: "center"
    },
    text: {
      paddingBottom: 8,
      fontSize: 12,
      textAlign: "center",
      color: textColor
    }
  });
  return (
    <TouchableOpacity style={styles.button} onPress={checkFiltreSelected}>
      <View style={styles.container}>
        <Entypo style={styles.icon} color={color} name={service} size={22} />
        <Text style={styles.text}>{caption}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FiltreButton;
