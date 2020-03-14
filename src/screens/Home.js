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

const Home = props => {
  const navigation = useNavigation();

  //--- utilistaeur connecté
  const { user, firebase } = useContext(FirebaseContext);

  //---
  const [isLoding, setIsLoding] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState();

  //  ---- Filtres
  const [distance, setDistance] = useState(GlobalFilter.Rayon);
  const [minStars, setMinStars] = useState(GlobalFilter.MinStars);
  const [menage, setMenage] = useState(
    GlobalFilter.ServicesFilters[0].selected
  );
  const [accueil, setAccueil] = useState(
    GlobalFilter.ServicesFilters[1].selected
  );
  const [travaux, setTravaux] = useState(
    GlobalFilter.ServicesFilters[2].selected
  );

  //--- Upload USERS
  const handleSnapshot = snapshot => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(users);
  };

  reloadServices = () => {
    setDistance(GlobalFilter.Rayon);
    setMinStars(GlobalFilter.MinStars);

    console.log("--------------------------");
    console.log(GlobalFilter.ServicesFilters[0].selected);
    console.log(GlobalFilter.ServicesFilters[1].selected);
    console.log(GlobalFilter.ServicesFilters[2].selected);
    console.log("--------------------------");

    setMenage(GlobalFilter.ServicesFilters[0].selected);
    setAccueil(GlobalFilter.ServicesFilters[1].selected);
    setTravaux(GlobalFilter.ServicesFilters[2].selected);
  };

  //--- hooks
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
  }, [firebase, searchText]);

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

  onSearchLocation = text => {
    const region = {
      latitude: 50,
      longitude: 14,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  };

  //--- Return
  return (
    <View style={styles.container}>
      <View style={{ height: 110 }}>
        <Text style={{ fontSize: 20 }}>FilterResult</Text>
        <Text>Distance : {distance}</Text>
        <Text>Note : {minStars}</Text>
        <Text>Accueil : {accueil}</Text>
        <Text>Menage : {menage}</Text>
        <Text>Travaux : {travaux}</Text>
      </View>
      {/* FILTRE */}
      <Search onSearchLocation={onSearchLocation} />
      <FiltresBar reloadServices={reloadServices} />
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
