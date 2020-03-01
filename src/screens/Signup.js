import React, { useContext, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles";

//--- Import navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";

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
      <Text style={styles.logo}> MyProj </Text>
      <TextInput
        style={styles.border}
        value={email}
        onChangeText={text => {
          setEmail(text);
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
        <Text>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
