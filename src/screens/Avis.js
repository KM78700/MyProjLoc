import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";

//--- components
import Star from "../components/Star";

//import styles from "../../styles";

//--- Universally Unique IDentifiers
import uuid from "uuid";

//--- Navigation
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";
//import { startAsync } from "expo/build/AR";

const Avis = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const navigation = useNavigation();
  const route = useRoute();

  //--- Chargement des informations de l'utilisateur connecté
  const [userConnected, setUserConnected] = useState({});

  //-- Rate
  const [rating, setRating] = useState();
  const [average, setAverage] = useState(0);
  //const [dataAvis, setDataAvis] = useState(null);
  const [nbAvis, setNbAvis] = useState(0);
  const [nbRate, setNbRate] = useState(0);

  //-- Avis
  const [titreAvis, setTitreAvis] = useState("Tire de l'avis");
  const [descriptionAvis, setDescriptionAvis] = useState(
    "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page"
  );

  //---
  useEffect(() => {
    console.log(user.uid); // id de l'utilisateur connecté
    console.log(route.params.presta_id); //id du prestataire sélectionné
    console.log(route.params.dataPrestataire); // data du prestataire sélectionné
  });

  //--- DATA - Liste des informations de l'utilisateur connecté dans la collection users
  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(user.uid) // user connecté
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setUserConnected(doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }, []);

  //---
  const objetAvis = {
    //user_id: user.uid,
    proprietaire_id: userConnected.uid,
    proprietaire_photo: userConnected.photo,
    proprietaire_ville: userConnected.ville,
    proprietaire: userConnected.pseudo,
    destinataire_id: route.params.presta_id, //a supprimer
    prestataire_id: route.params.presta_id,
    titre: titreAvis,
    description: descriptionAvis,
    rate: rating,
    createAt: new Date()
  };

  //--- writeAvis
  const writeAvis = async () => {
    const id = uuid.v4();
    await firebase.db
      .collection("avis_services")
      .doc(id)
      .set(objetAvis)
      .then(function() {
        console.log("Document successfully written!");
        calcAvis();
      })
      .catch(function() {
        console.log("Error writing document", error);
      });
    navigation.navigate("Details");
  };

  //--- CalcAvis
  const calcAvis = async () => {
    let nb_avis = 0;
    let nb_rate = 0;

    await firebase.db
      .collection("avis_services")
      .where("prestataire_id", "==", route.params.presta_id)
      // .orderBy("createAt", "desc")
      .onSnapshot(snapshot => {
        const dataAvis = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        //---
        dataAvis &&
          dataAvis.map((item, index) => {
            console.log("------------------");
            console.log("Index : " + index);
            nb_avis = nb_avis + 1;
            nb_rate = nb_rate + item.rate;
            console.log("------------------");
            console.log("nbAvis : " + nb_avis);
            console.log("nbRate : " + nb_rate);
            console.log("Average_Avis : " + Math.round(nb_rate / nb_avis));
            console.log("------------------");
            // setNbAvis(nb_avis);
            // setNbRate(nb_rate);
            console.log("nbAvis : " + nbAvis);
            console.log("nbRate : " + nbRate);
            console.log("Average_Avis : " + Math.round(nbRate / nbAvis));
            updateAvis(nb_avis, nb_rate);
          });
      });
  };

  //--- updateAvis
  const updateAvis = async (avis, rate) => {
    await firebase.db
      .collection("users")
      .doc(route.params.presta_id)
      .update({
        avis_count: avis,
        rate_count: rate,
        rate_average: Math.round(rate / avis)
      });
  };

  //---
  const numStars = 5;
  let stars = [];
  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableOpacity
        key={x}
        onPress={() => {
          setRating(x);
        }}
      >
        <Star filled={x <= rating ? true : false} />
      </TouchableOpacity>
    );
  }

  //--- Return
  return (
    <View style={styles.container}>
      {/* RATE */}
      <Text style={{ fontSize: 16 }}>Appuyer pour noter</Text>

      <View
        style={{
          flexDirection: "row"
        }}
      >
        {stars}
      </View>

      {/* DESCRIPTION */}
      <TextInput
        style={styles.border}
        value={objetAvis.avis}
        multiline={true}
        numberOfLines={2}
        onChangeText={text => {
          setTitreAvis(text);
        }}
        placeholder="Titre de l'avis"
      />
      <TextInput
        style={styles.border}
        value={objetAvis.avis}
        multiline={true}
        numberOfLines={5}
        onChangeText={text => {
          setDescriptionAvis(text);
        }}
        placeholder="Description de l'avis"
      />

      <TouchableOpacity style={styles.button} onPress={() => writeAvis()}>
        <Text>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    // justifyContent: "center",
    width: "100%"
  },
  border: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }
});

export default Avis;
