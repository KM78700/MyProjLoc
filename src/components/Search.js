import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import { Searchbar } from "react-native-paper";

const Search = () => {
  //--- Function

  //--- Return
  return (
  
      <Searchbar
        //onPressToFocus
        autoFocus={false}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        //backgroundColor="#353d5e"
        textInputDisable
        cancelButtonDisable
        //iconColor="#EE578D"
        placeholder="A proximité"
        onChangeText={text => {
          console.log(text);
        }}
        onPressCancel={() => {
          this.filterList("");
        }}
        onPress={() => alert("onPress")}
      />
    
  );
};

export default Search;
