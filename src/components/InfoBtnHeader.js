import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

//--- Icones
import { Ionicons, Entypo } from "@expo/vector-icons";

//--- Navigation
import { useNavigation } from "@react-navigation/core";

const InfoBtnHeader = () => {
  const navigation = useNavigation();

  //--- Function
  const info = () => {
    navigation.navigate("Info");
  };

  //--- Render

  return (
    <View style={styles.container} style={{ backgroundColor: "transparent" }}>
      <TouchableOpacity onPress={info}>
        <Entypo style={styles.headerButton} name={"info"} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default InfoBtnHeader;
