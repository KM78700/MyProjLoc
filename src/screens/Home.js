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

import { getDistance, getPreciseDistance } from "geolib";

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
import { Theme, ConnectedUser } from "../constants/GlobalConstantes";

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
  const [connectedUser, setConnectedUser] = useState([]);

  useEffect(() => {
    if (connectedUser && connectedUser.coordinates)
      ConnectedUser.coordonates = connectedUser.coordinates;
  }, [connectedUser]);

  //DATA -liste des prestataires
  useEffect(() => {
    firebase.db
      .collection("users")
      //.orderBy("createAt", "asc")
      .onSnapshot(snapshot => {
        const dataPrestataires = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // .orderBy("createAt", "asc")
        setPrestataires(dataPrestataires);
      });
    // utilisateur courant
    firebase.db
      .collection("users")
      .where("uid", "==", user.uid)
      .onSnapshot(snapshot => {
        const myUser = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConnectedUser(myUser[0]);
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
    console.log(printFilter(text));
  };

  const printFilter = proximite => {
    const filterText =
      "---------- Filtres -----\n" +
      "A proximité de :" +
      proximite +
      "\nDistance : " +
      distance +
      "\nMinStars : " +
      minStars +
      "\nAccueil : " +
      accueil +
      "\nMénage : " +
      menage +
      "\nTravaux : " +
      travaux +
      "\n--------------------------";
    return filterText;
  };

  const getDistance = (currentCoordonates, connectedCoordonates) => {
    let dis = 0;

    if (currentCoordonates && connectedUser != undefined) {
      dis = _getDistance(currentCoordonates, connectedUser.coordinates);
    }

    if (currentCoordonates === undefined) return "Dist. inconnue";

    return dis === 0 ? "moi même" : (dis / 1000).toFixed(2) + " Km";
  };

  const _getDistance = (pos1, pos2) => {
    let pdis = 0;
    if (pos1 && pos2) {
      pdis = getPreciseDistance(pos1, pos2);
    }
    return pdis;
  };

  //--- Return
  return (
    <View style={styles.container}>
      <Search onSearchLocation={onSearchLocation} />
      <FiltresBar
        reloadServices={reloadServices}
        a={accueil}
        m={menage}
        t={travaux}
      />

      <FlatList
        data={prestataires}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                prestataire_id: item.uid,
                item: item,
                distance: getDistance(item.coordinates) //id du prestataire sélectionné
              });
            }}
          >
            <View style={styles.userItem}>
              {/* SECTION 25% - Photo + pseudo */}
              <View style={styles.profilItem}>
                <Image
                  style={styles.profilItemImage}
                  source={{ uri: item.photo }}
                  defaultSource={require("../../assets/Avatar.png")}
                />

                <Text style={{ textAlign: "center" }}>{item.pseudo}</Text>
                <Text style={styles.profilItemDistance}>
                  {getDistance(item.coordinates)}
                </Text>
              </View>

              {/* SECTION 75% */}
              <View style={{ width: "75%" }}>
                <View style={styles.descriptionRateAndServices}>
                  <RateAverage
                    note={item.rate_average ? item.rate_average : 0}
                    nbAvis={item.avis_count ? item.avis_count : 0}
                  />
                  <ServicesBar />
                </View>

                <View style={styles.descriptionItem}>
                  <Text numberOfLines={4} style={{ textAlign: "justify" }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
