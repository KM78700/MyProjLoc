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

  const [accueilService, setAccueilService] = useState(
    <View style={{ backgroundColor: "transparent" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PostService", { type: "accueil" });
        }}
      >
        <Text>Créér mon service : Accueil</Text>
      </TouchableOpacity>
    </View>
  );
  const [menageService, setMenageService] = useState(
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PostService", { type: "menage" });
      }}
    >
      <Text>Créér mon service : Ménage</Text>
    </TouchableOpacity>
  );
  const [bricolageService, setBricolageService] = useState(
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PostService", { type: "bricolage" });
      }}
    >
      <Text>Créér mon service : Bricolage</Text>
    </TouchableOpacity>
  );

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
    {
      userServices.map((service, index) => {
        console.log(service.category_code);

        if (service.category_code == "accueil") {
          setAccueilService(
            <View style={{ padding: 25 }}>
              <Text>Mon service d'accueil</Text>
              <Text>Description : {service.description}</Text>
              <Text>Prix : {service.price}</Text>
            </View>
          );
        }
        if (service.category_code == "menage") {
          setMenageService(
            <View style={{ padding: 25 }}>
              <Text>Mon service de ménage</Text>
              <Text>Description : {service.description}</Text>
              <Text>Prix : {service.price}</Text>
            </View>
          );
        }
        if (service.category_code == "bricolage") {
          setBricolageService(
            <View style={{ padding: 25 }}>
              <Text>Mon service de bricolage</Text>
              <Text>Description : {service.description}</Text>
              <Text>Prix : {service.price}</Text>
            </View>
          );
        }
      });
    }

    return getUsers();
  }, [firebase]);

  return (
    <View>
      {accueilService}
      {menageService}
      {bricolageService}
    </View>
  );
}
