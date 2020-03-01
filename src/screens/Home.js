import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import styles from "../../styles";
import { GlobalFilter } from "../constants/FilterGroups";
//--- Components
import Rate from "../components/Rate";
//import Filtres from "../components/Filtres";
import Header from "../components/FilterHeaderBar/Header";
//--- Navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";

const Home = () => {
  const navigation = useNavigation();
  const { user, firebase } = useContext(FirebaseContext);

  //--- Function Details
  details = () => {
    navigation.navigate("Details");
  };

  //--- Upload USERS
  const [users, setUsers] = useState([]);

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
    return getUsers();
  }, [firebase]);

  //--- Return
  return (
    <View style={styles.container}>
      {/* FILTRE */}
      <Header filtersList={GlobalFilter.ServicesFilters} />

      {/* FLATLIST */}
      <FlatList
        data={users}
        renderItem={({ item }) => (
          //--- TouchableOpacity
          <TouchableOpacity onPress={details}>
            <View>
              <View style={[styles.row, styles.center]}>
                {/* Profil + logo */}
                <View style={[styles.row, styles.center]}>
                  <Image
                    style={styles.roundImage}
                    source={{ uri: item.photo }}
                  />
                  <Text>{item.email}</Text>
                </View>

                <View style={styles.row}>
                  <Rate note={3} />
                </View>
                <View style={styles.row}>
                  <Entypo
                    style={{ marginRight: 5 }}
                    color="brown"
                    name="key"
                    size={20}
                  />
                  <Entypo
                    style={{ marginRight: 5 }}
                    color="green"
                    name="trash"
                    size={20}
                  />
                  <Entypo
                    style={{ marginRight: 5 }}
                    color="blue"
                    name="tools"
                    size={20}
                  />
                </View>
              </View>
              {/* Photo + Description */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: "#eee",
                  fontsize: 16,
                  padding: 10
                }}
              >
                <Image
                  style={{
                    width: "30%",
                    resizeMode: "cover",
                    borderRadius: 15
                  }}
                  source={{ uri: item.postPhoto }}
                />
                <Text style={{ width: "70%", paddingLeft: 10 }}>
                  {item.postDescription}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
