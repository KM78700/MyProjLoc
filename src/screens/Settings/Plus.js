import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import styles from "../../../styles";
import { useNavigation } from "@react-navigation/core";
import FirebaseContext from "../../firebase/FirebaseContext";
import { getDistance, getPreciseDistance } from "geolib";
import Geocoder from "react-native-geocoder";
import * as Location from "expo-location";

export default Profile = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);
  const [dist, setDist] = useState("");
  const [address, setAddress] = useState("208 boulevard gallieni 92390 ");
  const [coordonates, setCoordonates] = useState("");

  const removeAccount = async () => {
    const localAccount = await AsyncStorage.removeItem("account");
  };

  //--- Function LogOut
  signOut = () => {
    removeAccount();
    firebase.logOut();
    navigation.navigate("Login");
  };

  handleCalcDistance = async () => {
    navigation.navigate("Location");
  };

  const handleCalcCoordonates = async () => {
    navigation.navigate("LocationCoordonates");
  };

  //--- Return
  return (
    <View style={styles.container}>
      <View style={{ width: "90%", height: 200 }}>
        <TouchableOpacity
          style={{
            borderColor: "#0000FF",
            borderWidth: 1,
            borderRadius: 10,
            margin: 10
          }}
          onPress={handleCalcCoordonates}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              margin: 10,
              padding: 10
            }}
          >
            Get coordonates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "#0000FF",
            borderWidth: 1,
            borderRadius: 10,
            margin: 10
          }}
          onPress={handleCalcDistance}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              margin: 10,
              padding: 10
            }}
          >
            Géolocalisation
          </Text>
        </TouchableOpacity>
      </View>
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
