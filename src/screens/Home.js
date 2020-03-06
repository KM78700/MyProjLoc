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
import Search from "../components/Search";
import FiltresBar from "../components/FiltresBar";
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
            <View
              style={{
                // flex: 1,
                width: "100%",
                height: 120,
                flexDirection: "row",
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#d6d7da",
                paddingTop: 5,
                paddingBottom: 5
              }}
            >
              {/* SECTION 25% - Photo + pseudo */}
              <View
                style={{
                  width: "25%",
                  //backgroundColor: "grey",
                  flexDirection: "column"
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    // width: 80,
                    // height: 80,
                    width: "80%",
                    height: "80%",
                    resizeMode: "contain",
                    borderRadius: 20,
                    margin: 5,
                    backgroundColor: "lightgrey"
                  }}
                  source={{ uri: item.photo }}
                />
                <Text style={{ textAlign: "center" }}>{item.pseudo}</Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "brown"
                  }}
                >
                  3,2 km
                </Text>
              </View>

              {/* SECTION 75% */}
              <View style={{ width: "75%" }}>
                {/* Rate + Icônes services */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    //backgroundColor: "yellow",
                    marginLeft: 15,
                    marginRight: 5,
                    marginTop: 5,
                    marginBottom: 5
                  }}
                >
                  <Rate note={3} />
                  <View style={{ flexDirection: "row" }}>
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
                {/* Fin Rate + Icônes service */}

                {/* Description */}
                <View
                  style={{
                    //flex: 1,
                    flexDirection: "row",
                    //justifyContent: "space-around",
                    //backgroundColor: "#eee",
                    fontsize: 16,
                    paddingRight: 15
                  }}
                >
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
