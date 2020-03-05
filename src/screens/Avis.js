import React, { useState, useEffect, useContext, useReducer } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "../../styles";

//-- Icônes
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

//--- Navigation
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";

const Avis = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const navigation = useNavigation();
  const route = useRoute();

  //-- Rate
  const [isCheck1, setIsCheck1] = useState(false);
  const [isValue1, setIsValue1] = useState(0);
  const [color, setColor] = useState("gray");

  const checkColor = () => {
    if (isCheck1) {
      setColor("gray");
    } else {
      setColor("#fdce02");
    }
     isCheck1 ? setIsValue1(0) : setIsValue1(1);
    setIsCheck1(!isCheck1);
  };

  //-- Avis
  const [titreAvis, setTitreAvis] = useState("");
  const [descriptionAvis, setDescriptionAvis] = useState("");

  const objetAvis = {
    user_id: user.uid,
    destinataire_id: route.params.presta_id.uid,
    titre: titreAvis,
    description: descriptionAvis,
    rate: isValue1,
    createAt: new Date()
  };

  const writeAvis = () => {
    firebase.addAvis(objetAvis);
  };

  //--- Return
  return (
    <View style={styles.containerAvis}>
      {/* RATE */}
      <Text style={{fontSize:16}}>Appuyer pour noter</Text>
      <TouchableOpacity
        style={{
          marginTop: 5,
          marginBottom: 8,
          marginLeft: 2,
          marginRight: 2
        }}
        onPress={checkColor}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Entypo
            style={{
              paddingTop: 10,
              textAlign: "center"
            }}
            color={color}
            name="star"
            size={50}
          />
        </View>
      </TouchableOpacity>

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

export default Avis;
