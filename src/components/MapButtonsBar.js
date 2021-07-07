import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Theme } from "../constants/GlobalConstantes";

export default function MapButtonsBar(props) {
  const { onDeltaPlus, onDeltaMinus } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.fixToText}>
      <IconButton
        icon="plus"
        color={Theme.AppColor}
        size={40}
        onPress={onDeltaPlus}
      />
      <IconButton
        icon="minus"
        color={Theme.AppColor}
        size={40}
        onPress={onDeltaMinus}
      />
      <IconButton
        icon="arrow-collapse-all"
        color={Theme.AppColor}
        size={40}
        onPress={() => Alert.alert("Button arrow-collapse-all pressed")}
      />
      <IconButton
        icon="arrow-expand-all"
        color={Theme.AppColor}
        size={40}
        onPress={() => Alert.alert("Button arrow-expand-all pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",

    position: "absolute",
    top: "90%",
    alignSelf: "flex-end"
  }
});
