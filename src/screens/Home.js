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
import LoadingComponent from "../components/LoadingComponent";
import Rate from "../components/Rate";
import Search from "../components/Search";
import FiltresBar from "../components/FiltresBar";
import ServicesBar from "../components/ServicesBar";
//--- Navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";
import { Theme } from "../constants/GlobalConstantes";

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

  const [menage, setMenage] = useState(false);
  const [accueil, setAccueil] = useState(false);
  const [travaux, setTravaux] = useState(false);

  //--- Upload USERS
  const handleSnapshot = snapshot => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(users);
  };

  reloadServices = (a, m, t) => {
    setDistance(GlobalFilter.Rayon);
    setMinStars(GlobalFilter.MinStars);
    if (a != null) setAccueil(a);
    if (m != null) setMenage(m);
    if (t != null) setTravaux(t);
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
    });

    setTimeout(() => {
      setIsLoding(false);
    }, 1500);
  }, [firebase, searchText]);

  //--- ActivityIndicator
  if (isLoding) {
    return <LoadingComponent />;
  }

  onSearchLocation = text => {
    const region = {
      latitude: 50,
      longitude: 14,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  };

  onParamsPress = () => {
    alert(
      "Filtres :\n" +
        "Distance : " +
        distance +
        "\nMinStars : " +
        minStars +
        "\nAccueil : " +
        accueil +
        "\nMénage : " +
        menage +
        "\nTravaux : " +
        travaux
    );
  };

  //--- Return
  return (
    <View style={styles.container}>
      <View style={{ height: 20 }}>
        <TouchableOpacity onPress={onParamsPress}>
          <Text style={{ color: "red" }}>Test variables</Text>
        </TouchableOpacity>
      </View>
      {/* FILTRE */}
      <Search onSearchLocation={onSearchLocation} />
      <FiltresBar
        reloadServices={reloadServices}
        a={accueil}
        m={menage}
        t={travaux}
      />
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
