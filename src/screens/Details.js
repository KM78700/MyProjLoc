import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
 
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import styles from "../../styles";

//--- Navigation
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";
import { useScreens } from "react-native-screens";
import uuid from "uuid";
import { ScrollView } from "react-native-gesture-handler";

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, firebase } = useContext(FirebaseContext);
  const [userId, setUserId] = useState({});
  const [userAvis, setUserAvis] = useState();

  //----------------------- ReadUser
  useEffect(() => {
    const userdata = firebase.db.collection("users").doc(route.params.id);
    let getDoc = userdata
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          //console.log("Document data:", doc.data());
          setUserId(doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }, [firebase]);

  //----------------------- ReadAvis
  const handleSnapshot = snapshot => {
    const avis = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUserAvis(avis);
  };

  useEffect(() => {
    const getAvis = () => {
      firebase.db
        .collection("avis_services")
        .where("destinataire_id", "==", route.params.id)
        .onSnapshot(handleSnapshot);
    };
    return getAvis();
  }, [firebase]);

  //-- Return
  return (
    <View style={styles.containerPost}>
      <Image
        style={styles.postPhoto}
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/koala.jpg?alt=media&token=57861261-d7f9-44c8-8c86-8c296f1c06d8"
        }}
      />

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
                color: "#171F33"
              }}
              name={"pencil-square"}
              size={30}
            />
            <Text>Ajouter un avis</Text>
          </View>
        </TouchableOpacity>

        {/* Message */}
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
              name={"wechat"}
              size={30}
            />
            <Text>Envoyer un message</Text>
          </View>
        </TouchableOpacity>

        {/* Tel */}
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
      <ScrollView>
        {/*  */}
        <Text style={styles.style1}>{userId.pseudo}</Text>
        <Text style={styles.style2}>{userId.uid}</Text>
        <Text style={styles.style2}>{userId.email}</Text>
        <Text style={styles.style2}>{userId.description}</Text>
        {/*  */}
        <Text style={styles.titleAvis}>Avis</Text>
        {/* <Text style={styles.style1}>{userAvis[0].user_id}</Text> */}
        {/* <Text style={styles.style1}> */}
        {userAvis &&
          userAvis.map((item, i) => {
            return (
              <Text style={styles.style2} key={i}>
                {item.titre}
              </Text>
            );
          })}
        {/* </Text> */}
      </ScrollView>
    </View>
  );
};

export default Details;
