import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const Clients = () => {
  //--- Function

  //--- Return
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Clients</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Uploader la liste des clients
      </Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        "Prestataires sélectionnés"
      </Text>
    </View>
  );
};

export default Clients;
