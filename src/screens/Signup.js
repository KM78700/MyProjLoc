import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles";

//--- Import navigation
import { useNavigation } from "@react-navigation/core";

const Signup = () => {
  const navigation = useNavigation();

  //--- Function
  signup = () => {
    navigation.navigate("Home");
  };

  //-- return
  return (
    <View style={styles.containerAuth}>
      <Text style={styles.logo}> MyProj </Text>
      <TextInput
        style={styles.border}
        // value={}
        onChangeText={input => {}}
        placeholder="Email"
      />
      <TextInput
        style={styles.border}
        // value={}
        onChangeText={input => {}}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.border}
        // value={}
        onChangeText={input => {}}
        placeholder="Username"
      />
      <TextInput
        style={styles.border}
        // value={}
        onChangeText={input => {}}
        placeholder="Bio"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
      >
        <Text>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
