import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import styles from "../../styles";

//--- Import navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";

const Login = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getAccount = async () => {
    const localAccount = await AsyncStorage.getItem("account");
    if (localAccount) {
      setTimeout(() => navigation.replace("Home"));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  //Login email
  const handleLogin = async () => {
    await firebase.loginEmail(email, password);
    AsyncStorage.setItem("account", JSON.stringify(user));
    user && navigation.navigate("Home");
  };

  //-- Return
  return (
    <View style={styles.containerAuth}>
      <Text style={styles.logo}> MyProj </Text>
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
      {/* LOGIN EMAIL */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      {/* LOGIN GOOGLE */}
      <TouchableOpacity
        style={styles.googleButton}
        // onPress={() => firebase.loginGoogle()}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.facebookText}>Google Login</Text>
      </TouchableOpacity>
      <Text style={{ paddingTop: 20, paddingBottom: 0 }}>OR</Text>

      {/* SIGNUP */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
