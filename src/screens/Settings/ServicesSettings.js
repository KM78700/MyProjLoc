import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//--- Icones
import { Ionicons, Entypo } from "@expo/vector-icons";

//--- Navigation
import { useNavigation } from "@react-navigation/core";
import FirebaseContext from "../../firebase/FirebaseContext";

export default function ServicesSettings() {
  const { user, firebase } = useContext(FirebaseContext);
  const [userServices, setUserServices] = useState([]);

  const handleSnapshot = snapshot => {
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUserServices(services);
  };
  const navigation = useNavigation();

  useEffect(() => {
    const getUsers = () => {
      firebase.db
        .collection("services")
        .where("user_uid", "==", user.uid)
        .onSnapshot(handleSnapshot);
    };

    let serviceDispo = [];
    {
      userServices.map((service, index) => {
        serviceDispo.push(service.category_code);
      });
    }

    return getUsers();
  }, [firebase]);

  return (
    <View>
      <View style={{ backgroundColor: "transparent" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PostService", { type: "accueil" });
          }}
        >
          <Text>Créér mon service : Accueil</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PostService", { type: "menage" });
        }}
      >
        <Text>Créér mon service : Ménage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PostService", { type: "bricolage" });
        }}
      >
        <Text>Créér mon service : Bricolage</Text>
      </TouchableOpacity>
    </View>
  );
}
