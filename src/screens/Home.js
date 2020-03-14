import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import styles from "../../styles";
import { GlobalFilter } from "../constants/FilterGroups";

//--- Components
import RateAverage from "../components/RateAverage";
import Filtres from "../components/Filtres";
import Rate from "../components/Rate";
import Search from "../components/Search";
import FiltresBar from "../components/FiltresBar";
import ServicesBar from "../components/ServicesBar";
//--- Navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";

const Home = () => {
  const navigation = useNavigation();

  //--- utilistaeur connecté
  const { user, firebase } = useContext(FirebaseContext);

  //--- hooks
  const [isLoding, setIsLoding] = useState(true);
  const [prestataires, setPrestataires] = useState([]);

  //DATA -liste des prestataires
  useEffect(() => {
    firebase.db.collection("users").onSnapshot(snapshot => {
      const dataPrestataires = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPrestataires(dataPrestataires);
      //console.log(prestataires);
    });

    setTimeout(() => {
      setIsLoding(false);
    }, 1500);
  }, [firebase]);

  //--- ActivityIndicator
  if (isLoding) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            color: "brown",
            padding: 10
          }}
        >
          Bienvenue
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            paddingTop: 10,
            paddingBottom: 20
          }}
        >
          Chargement des données
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  //--- Return
  return (
    <View style={styles.container}>
      {/* FILTRE */}
      <Search />
      <FiltresBar />
      {/* FLATLIST */}
      <FlatList
        data={prestataires}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          //--- TouchableOpacity
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                prestataire_id: item.uid //id du prestataire sélectionné
              });
            }}
          >
            <View style={styles.userItem}>
              {/* SECTION 25% - Photo + pseudo */}
              <View style={styles.profilItem}>
                <Image
                  style={styles.profilItemImage}
                  source={{ uri: item.photo }}
                />
                <Text style={{ textAlign: "center" }}>{item.pseudo}</Text>
                <Text style={styles.profilItemDistance}>3,2 km</Text>
              </View>

              {/* SECTION 75% */}
              <View style={{ width: "75%" }}>
                {/* Rate + Icônes services */}
                <View style={styles.descriptionRateAndServices}>
                  <RateAverage
                    note={item.rate_average}
                    nbAvis={item.avis_count}
                  />
                  <ServicesBar />
                </View>
                {/* Fin Rate + Icônes service */}

                {/* Description */}
                <View style={styles.descriptionItem}>
                  <Text numberOfLines={4} style={{ textAlign: "justify" }}>
                    {item.description}
                  </Text>
                </View>
                {/* Fin Description */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
