import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import GlobalFilter from "../constants/FilterGroups";
import { getDistance, getPreciseDistance } from "geolib";

export default FiltreButton = props => {
  const {
    code,
    caption,
    service,
    color,
    isGlobalFilter,
    filterState,
    reloadServices,
    a,
    m,
    t
  } = props;
  const [isFiltreSelected, setIsFiltreSelected] = useState(true);
  const [backColor, setBackColor] = useState("white");
  const navigation = useNavigation();

  // _getDistance = () => {
  //   let pos1 = { latitude: 48.9346535, longitude: 2.3329436 };
  //   let pos2 = { latitude: 48.8737304, longitude: 2.3194495 };
  //   var dis = getDistance(pos1, pos2);
  //   var pdis = getPreciseDistance(pos1, pos2);
  //   alert(
  //     `Distance\n${dis} m\n Ou \n${dis /
  //       1000} km \n\n Precise Distance\n${pdis} m\nor\n${pdis / 1000} km`
  //   );
  // };

  const checkFiltreSelected = () => {
    if (!isGlobalFilter) {
      //_getDistance();
      setIsFiltreSelected(!isFiltreSelected);
      setBackColor(isFiltreSelected ? "#ffc7bd" : "white");
      if (code === "FILTER_1") reloadServices(isFiltreSelected, null, null);
      else if (code === "FILTER_2")
        reloadServices(null, isFiltreSelected, null);
      if (code === "FILTER_3") reloadServices(null, null, isFiltreSelected);
    } else {
      navigation.navigate("Filter", {
        reloadServices: reloadServices,
        a: a,
        m: m,
        t: t
      });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isGlobalFilter
          ? styles.backgroudUnChecked
          : isFiltreSelected
          ? styles.backgroudUnChecked
          : styles.backgroudChecked
      ]}
      onPress={checkFiltreSelected}
    >
      <View style={styles.container}>
        <Entypo style={styles.icon} color={color} name={service} size={22} />
        <Text style={styles.text}>{caption}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backgroudChecked: {
    backgroundColor: "#ffc7bd"
  },
  backgroudUnChecked: {
    backgroundColor: "white"
  },
  button: {
    borderWidth: 0.5,
    borderColor: "lightgray",
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
