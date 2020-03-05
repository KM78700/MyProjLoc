import React, { useContext } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import styles from "../../../styles";

//--- Import navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../../firebase/FirebaseContext";

const Profile = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);

  const removeAccount = async () => {
    const localAccount = await AsyncStorage.removeItem("account");
  };

  //--- Function LogOut
  signOut = () => {
    removeAccount();
    firebase.logOut();
    navigation.navigate("Login");
  };

  //--- Return
  return (
    <View style={styles.container}>
      {/* TAB BAR */}
      <Text style={{ fontSize: 25 }}>Tab View (2 onglets)</Text>
      <Text style={{ fontSize: 20, color: "#909090", paddingBottom: 20 }}>
        SERVICE + PROFIL
      </Text>

      {/* SERVICE */}
      <Text style={{ fontSize: 25 }}>Filtre</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>Service proposé</Text>
      <Text style={{ fontSize: 20, color: "#909090", paddingBottom: 20 }}>
        -
      </Text>

      {/* PROFIL */}
      <Text style={{ fontSize: 25 }}>Profil</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Photo + màj des données personnelles
      </Text>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
