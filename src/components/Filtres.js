import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../styles";

//--- Icônes
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

//--- Component
import Filtre from "../components/Filtre";

const Filtres = () => {
  [key, useKey] = useState(false);

  //--- Return
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: Theme.buttonBandColor
      }}
    >
      <View style={{ width: "25%" }}>
        <Filtre
          title1="Accueil"
          // title2=" des clés"
          service="key"
          color="brown"
        />
      </View>
      <View style={{ width: "25%" }}>
        <Filtre
          title1="Ménage"
          // title2="et linge"
          service="trash"
          color="green"
        />
      </View>

      <View style={{ width: "25%" }}>
        <Filtre
          title1="Travaux"
          // title2="divers"
          service="tools"
          color="blue"
        />
      </View>

      <View style={{ width: "25%" }}>
        <Filtre
          title1="Filtres"
          // title2="Distance"
          service="menu"
        />
      </View>
    </View>
  );
};

export default Filtres;
