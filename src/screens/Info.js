import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const Info = () => {
  //--- Function

  //--- Return
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Informations</Text>
      <Text style={{ fontSize: 25 }}></Text>

      <Text style={{ fontSize: 20, color: "#909090" }}>
        Description de l'application
      </Text>
      <Text>+</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Product Roadmap V1, V2 ...
      </Text>
    </View>
  );
};

export default Info;
