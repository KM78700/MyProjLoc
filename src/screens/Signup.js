import React, { useContext, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/core";
import FirebaseContext from "../firebase/FirebaseContext";
import { Theme } from "../constants/GlobalConstantes";

const Signup = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //--- Function
  const UserSignup = async () => {
    await firebase.SignupUser(email, password);
    user && navigation.navigate("Home");
  };

  //-- return
  return (
    <View style={styles.containerAuth}>
      <Text style={styles.logo}> {Theme.appName} </Text>
      <TextInput
        style={styles.border}
        value={email}
        onChangeText={text => {
          setEmail(text.toLowerCase());
        }}
        placeholder="Email"
      />
      <TextInput
        style={styles.border}
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      {/* <TextInput
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
      /> */}
      <TouchableOpacity style={styles.button} onPress={UserSignup}>
        <Text style={styles.buttonTitle}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
