import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Theme } from "../constants/GlobalConstantes";
import styles from "../../styles";

export default function ButtonBar() {
  const navigation = useNavigation();
  const [favoris, setFavoris] = useState(false);

  const onClickTakePhoto = () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.buttonBand}>
      <IconButton
        icon="camera"
        color={Theme.buttonLabelColor}
        size={40}
        onPress={onClickTakePhoto}
      />
      <IconButton
        icon="heart"
        color={favoris ? Theme.buttonLabelColor : Theme.buttonLabelAlterneColor}
        size={40}
        onPress={() => setFavoris(!favoris)}
      />
      <IconButton
        icon="map"
        color={Theme.buttonLabelColor}
        size={40}
        onPress={() => Alert.alert("Button more pressed")}
      />
      <IconButton
        icon="share"
        color={Theme.buttonLabelColor}
        size={40}
        onPress={() => Alert.alert("Button share pressed")}
      />
    </View>
  );
}
