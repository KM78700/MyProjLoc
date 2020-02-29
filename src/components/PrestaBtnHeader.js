import React from "react";
import { View } from "react-native";
import styles from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

//--- Icones
import { Ionicons, Entypo } from "@expo/vector-icons";

//--- Navigation
import { useNavigation } from "@react-navigation/core";

const PrestaBtnHeader = () => {
  const navigation = useNavigation();

  //--- Function
  const presta = () => {
    navigation.navigate("Post");
  };

  return (
    <View style={styles.container} style={{ backgroundColor: "transparent" }}>
      <TouchableOpacity onPress={presta}>
        <Entypo
          style={{
            marginLeft: 10,
            color: "#909090",
            paddingRight: 15
          }}
          name={"add-user"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrestaBtnHeader;
