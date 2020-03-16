import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { Theme } from "../constants/GlobalConstantes";

export default LoadingComponent = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.containerText1}>Bienvenue</Text>
      <Text style={styles.containerText2}>Chargement des données</Text>
      <Text style={styles.containerText1}>{Theme.appName}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  containerText1: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "brown",
    padding: 10
  },
  containerText2: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20
  }
});
