import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

export default FiltreButton = props => {
  const { caption, service, color, isGlobalFilter, filterState } = props;
  const [isFiltreSelected, setIsFiltreSelected] = useState(true);
  const [backColor, setBackColor] = useState("white");
  const navigation = useNavigation();

  const checkFiltreSelected = () => {
    if (!isGlobalFilter) {
      setIsFiltreSelected(!isFiltreSelected);
      setBackColor(isFiltreSelected ? "#ffc7bd" : "white");
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
      color: "black"
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
