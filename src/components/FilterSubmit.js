import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import { Theme } from "../appConstants/AppConstants";

export default function FilterSubmit(props) {
  const { text, onPress } = props;
  props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    margin: 20,
    //backgroundColor: Theme.AppColor
    backgroundColor: "blue"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
