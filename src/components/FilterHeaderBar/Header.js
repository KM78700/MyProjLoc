import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
//import { Theme } from "../../constants/Constants";
import { Searchbar } from "react-native-paper";

import FilterBar from "./FilterBar";

export default function Header(props) {
  const { filtersList } = props;
  return (
    <View style={styles.container}>
      <Searchbar
        style={{ marginLeft: 8, marginRight: 8, marginBottom: 10 }}
        //onPressToFocus
        autoFocus={false}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        //shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        //backgroundColor="#353d5e"
        textInputDisable
        cancelButtonDisable
        iconColor="#EE578D"
        placeholder="A proximité"
        onChangeText={text => {
          console.log(text);
        }}
        onPressCancel={() => {
          this.filterList("");
        }}
        onPress={() => alert("onPress")}
      />

      <FilterBar filtersList={filtersList}></FilterBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: "column",
    backgroundColor: "#171F33",
    // padding: 5,
    //  margin: 2,
    width: "100%"
  }
});
