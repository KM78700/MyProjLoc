import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const Carte = () => {
  //--- Function

  //--- Return
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Map</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Copier/Coller code Alex "Airbnb"
      </Text>
    </View>
  );
};

export default Carte;
