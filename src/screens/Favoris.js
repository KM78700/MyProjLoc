import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const Favoris = () => {
  //--- Function

  //--- Return
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Favoris</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Uploader la liste des favoris
      </Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        "Prestatires à contacter"
      </Text>
    </View>
  );
};

export default Favoris;
