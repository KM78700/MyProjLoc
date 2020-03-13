import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";

const Home = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);

  //---
  const [isLoding, setIsLoding] = useState(true);
  const [users, setUsers] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [searchText, setSearchText] = useState();

  //--- Upload USERS
  const handleSnapshot = snapshot => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(users);
  };

  useEffect(() => {
    const getUsers = () => {
      firebase.db.collection("users").onSnapshot(handleSnapshot);
    };
    setTimeout(() => {
      setIsLoding(false);
    }, 1500);
    return getUsers();
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
        <ActivityIndicator size="large" color="blue" />
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
    RNReverseGeocode.searchForLocations(text, region, (err, res) => {
      // console.log({
      //   error: err,
      //   addresses: res
      // });
    });
  };
  //--- Return
  return (
    <View style={styles.container}>
      <View style={{ height: 110 }}>
        <Text style={{ fontSize: 20 }}>FilterResult</Text>
        <Text>Accueil : {filterState.accueil ? "true" : "false"}</Text>
        <Text>Menage : {filterState.menage ? "true" : "false"}</Text>
        <Text>Travaux : {filterState.travaux ? "true" : "false"}</Text>
        <Text>Distance : {GlobalFilter.Rayon}</Text>
        <Text>Note : {3}</Text>
      </View>
      {/* FILTRE */}
      <Search onSearchLocation={onSearchLocation} />
      <FiltresBar filterState={filterState} />
      {/* FLATLIST */}
      <FlatList
        data={users}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          //--- TouchableOpacity
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                id: item.uid,
                messageId: item.messageId
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
                  <Rate note={3} />
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
