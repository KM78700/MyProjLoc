import React, { useContext } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import styles from "../../styles";

//--- Import navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/context";

const Profile = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);

  //--- Function LogOut
  signOut = () => {
    firebase.logOut();
    navigation.navigate("Login");
  };

  //--- Return
  return (
    <View style={styles.container}>
      {/* TAB BAR */}
      <Text style={{ fontSize: 25 }}>Tab View (2 onglets)</Text>
      <Text style={{ fontSize: 20, color: "#909090", paddingBottom: 20 }}>
        FILTRE + PROFIL
      </Text>

      {/* FILTRE */}
      <Text style={{ fontSize: 25 }}>Filtre</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Recherche par nom de ville
      </Text>
      <Text style={{ fontSize: 20, color: "#909090", paddingBottom: 20 }}>
        Trier les resultats (distance / Evaluation)
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
