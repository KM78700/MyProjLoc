import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import ButtonBar from "../components/ButtonBar";

//import { useNavigation } from "@react-navigation/core";
import styles from "../../styles";

//--- Components
import RateAverage from "../components/RateAverage";
import Rate from "../components/Rate";

//--- Navigation
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";
import { useScreens } from "react-native-screens";
import uuid from "uuid";
import { Button } from "react-native-paper";

export default Details = () => {
  const navigation = useNavigation();
  const route = useRoute();

  //---
  const { user, firebase } = useContext(FirebaseContext);
  const [isUseEffect1, setIsUseEffect1] = useState(true);
  const [isUseEffect2, setIsUseEffect2] = useState(true);
  const [userId, setUserId] = useState({});
  const [userAvis, setUserAvis] = useState();

  //--- Lecture de la fiche du prestataire
  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(route.params.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setUserId(doc.data());
          setTimeout(() => {
            setIsUseEffect1(false);
          }, 0);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }, [firebase]);

  //--- Lecture des avis du prestataire
  useEffect(() => {
    firebase.db
      .collection("avis_services")
      .where("destinataire_id", "==", route.params.id)
      .onSnapshot(snapshot => {
        const avis = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserAvis(avis);
        setTimeout(() => {
          setIsUseEffect2(false);
        }, 0);
      });
  }, [firebase]);

  //--- ActivityIndicator
  if (isUseEffect1 || isUseEffect2) {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const onChatClick = event => {
    navigation.navigate("Chat", { connectedUser: user, currentUser: userId });
  };
  //---
  return (
    <ScrollView>
      <View style={styles.containerPost}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          dotColor={"lightblue"}
          activeDotColor={"blue"}
          // index={3}
        >
          {/* SLIDE 1 */}
          <View style={styles.slide1}>
            <ImageBackground
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                top: 0,
                left: 0
              }}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/villers_sur_mer.jpg?alt=media&token=563143cf-1867-40c1-9e42-1a5f7663665f"
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                borderWidth: 2,
                borderColor: "magenta",
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 50
              }}
              onPress={() => {
                navigation.navigate("Favoris");
              }}
            >
              <FontAwesome name={"heart"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>

          {/* SLIDE 2 */}
          <View style={styles.slide1}>
            <ImageBackground
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                top: 0,
                left: 0
              }}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/villers_sur_mer.jpg?alt=media&token=563143cf-1867-40c1-9e42-1a5f7663665f"
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                borderWidth: 2,
                borderColor: "magenta",
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 50
              }}
              onPress={() => {
                navigation.navigate("Favoris");
              }}
            >
              <FontAwesome name={"heart"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>

          {/* SLIDE 3 */}
          <View style={styles.slide1}>
            <ImageBackground
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                top: 0,
                left: 0
              }}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/villers_sur_mer.jpg?alt=media&token=563143cf-1867-40c1-9e42-1a5f7663665f"
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                borderWidth: 2,
                borderColor: "magenta",
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 50
              }}
              onPress={() => {
                navigation.navigate("Favoris");
              }}
            >
              <FontAwesome name={"heart"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>
        </Swiper>

        {/* BANDEAU Avis + Message + Appeler */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#d4e6f1",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
        >
          {/* Avis */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Avis", {
                presta_id: userId
              })
            }
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FontAwesome
                style={{
                  color: "#171F33",
                  backgroundColor: "white",
                  borderColor: "magenta"
                }}
                name={"pencil-square"}
                size={30}
              />
              <Text>Ajouter un avis</Text>
            </View>
          </TouchableOpacity>

          {/* Message */}
          <TouchableOpacity onPress={onChatClick}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FontAwesome
                style={{
                  color: "#171F33"
                }}
                name={"wechat"}
                size={30}
              />
              <Text>Envoyer un message</Text>
            </View>
          </TouchableOpacity>

          {/* Appeler */}
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FontAwesome
                style={{
                  color: "#171F33"
                }}
                name={"phone-square"}
                size={30}
              />
              <Text>Appeler</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* DESCRIPTION */}
        <View>
          {/*  */}
          <View
            style={{
              // flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            {/* Bloc de gauche */}
            <View
              style={{
                // flex: 1,
                flexDirection: "row"
              }}
            >
              <Image
                style={{
                  // flex: 1,
                  marginTop: 8,
                  marginLeft: 8,
                  width: 60,
                  height: 60,
                  resizeMode: "cover",
                  borderRadius: 50,
                  backgroundColor: "lightgrey"
                }}
                source={{ uri: userId.photo }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    paddingTop: 12,
                    paddingLeft: 12,
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  {userId.pseudo}
                </Text>
                <Text
                  style={{
                    paddingTop: 2,
                    paddingLeft: 12,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "brown"
                  }}
                >
                  3.2 km
                </Text>
              </View>
            </View>

            {/* Bloc de droite */}
            <View
              style={{
                // flex: 1,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 12,
                  marginRight: 12
                }}
              >
                <View>
                  <RateAverage note={userId.rate_average} />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 2,
                    justifyContent: "flex-end"
                  }}
                >
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
            </View>
            {/*  */}
            <FontAwesome
              style={styles.buttonLabel}
              name={"phone-square"}
              size={30}
            />
            <Text>Appeler</Text>
          </View>

          {/* Description */}
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                paddingTop: 8,
                paddingLeft: 12,
                fontSize: 16
              }}
            >
              {userId.description}
            </Text>
          </View>
          {/* Fin de description */}

          {/* ----------------------------- */}
          {/* ------------ AVIS ----------- */}
          {/* ----------------------------- */}
          <View>
            <Text style={styles.titleAvis}>Avis</Text>
          </View>

          {/* AVIS */}
          {userAvis && (
            <FlatList
              data={userAvis}
              // keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    borderWidth: 0.5,
                    borderColor: "#d6d7da"
                  }}
                >
                  {/*  */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 8,
                      paddingLeft: 5
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={{
                          // flex: 1,
                          width: 60,
                          height: 60,
                          resizeMode: "cover",
                          borderRadius: 50,
                          backgroundColor: "lightgrey"
                        }}
                        source={{ uri: item.proprietaire_photo }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            paddingLeft: 8
                          }}
                        >
                          {item.titre}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "brown",
                            paddingTop: 0,
                            paddingLeft: 8
                          }}
                        >
                          {item.proprietaire}
                        </Text>

                        <Text
                          style={{
                            fontSize: 16,
                            Color: "gray",
                            paddingLeft: 8
                          }}
                        >
                          {item.proprietaire_ville}
                        </Text>
                      </View>
                    </View>

                    {/* Bloc de droite */}
                    <View style={{ paddingRight: 12 }}>
                      <Rate note={item.rate} />
                      <Text
                        style={{
                          fontSize: 14,
                          color: "gray",
                          textAlign: "right"
                        }}
                      >
                        {new Date(
                          item.createAt.seconds * 1000
                        ).toLocaleDateString("fr-FR")}
                      </Text>
                    </View>
                    {/*  */}
                  </View>

                  {/* Description */}
                  <View>
                    <Text
                      style={{
                        paddingTop: 5,
                        paddingBottom: 12,
                        paddingLeft: 12,
                        paddingRight: 12,
                        fontSize: 16
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
