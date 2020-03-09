import React, { useContext, useState, useEffect } from "react";
import {
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
  const { user, firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);

  //--- Upload USERS
  const handleSnapshot = snapshot => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    const getUsers = () => {
      firebase.db.collection("users").onSnapshot(handleSnapshot);
    };
    return getUsers();
  }, [firebase]);

  //--- Return
  return (
    <View style={styles.container}>
      {/* FILTRE */}
      <Search />
      <FiltresBar />
      {/* FLATLIST */}
      <FlatList
        data={users}
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
