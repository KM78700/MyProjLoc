import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TextInput, ScrollView } from "react-native-gesture-handler";
import PhotoPicker from "./PhotoPicker";

//-- Import FirebaseContext
import FirebaseContext from "../../firebase/FirebaseContext";

export default function Profil() {
  const { user, firebase } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState([]);

  const navigation = useNavigation();

  const handleSnapshot = snapshot => {
    snapshot &&
      setCurrentUser(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
  };

  useEffect(() => {
    if (user) {
      const getUser = () => {
        firebase.db
          .collection("users")
          .where("uid", "==", user.uid)
          .onSnapshot(handleSnapshot);
      };
      return getUser();
    }
  }, [user]);

  const [newUsername, setNewUsername] = useState();
  const [newPseudo, setNewPseudo] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newBio, setNewBio] = useState();
  const [newDescription, setNewDescription] = useState();

  const [newAddress, setNewAddress] = useState();
  const [newCodePostal, setNewCodePostal] = useState();
  const [newVille, setNewVille] = useState();

  const handleSubmit = () => {
    console.log(user);
    firebase.db
      .collection("users")
      .doc(user.uid)
      .update({
        bio: newBio ? newBio : currentUser[0].bio ? currentUser[0].bio : "",
        description: newDescription
          ? newDescription
          : currentUser[0].description
          ? currentUser[0].description
          : "",
        pseudo: newPseudo ? newPseudo : currentUser[0].pseudo,
        email: newEmail ? newEmail : currentUser[0].email,
        username: newUsername
          ? newUsername
          : currentUser[0].username
          ? currentUser[0].username
          : "",
        address: newAddress
          ? newAddress
          : currentUser[0].address
          ? currentUser[0].address
          : "",
        postal_code: newCodePostal
          ? newCodePostal
          : currentUser[0].postal_code
          ? currentUser[0].postal_code
          : "",
        ville: newVille
          ? newVille
          : currentUser[0].ville
          ? currentUser[0].ville
          : ""
      });

    alert("Modification");
    setNewUsername("");
    setNewPseudo("");
    setNewBio("");
    setNewEmail("");
    setNewAddress("");
    setNewCodePostal("");
    setNewVille("");

    //firebase.db.console.log("Modifier les données dans la base de données");
  };

  return (
    <ScrollView>
      <View>
        <PhotoPicker label="Modifier votre photo" />

        <View style={styles.field}>
          <Text>Votre username </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewUsername(text)}
            value={newUsername}
            placeholder={currentUser[0] && currentUser[0].username}
          />
        </View>

        <View style={styles.field}>
          <Text>Votre pseudo </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewPseudo(text)}
            value={newPseudo}
            placeholder={currentUser[0] && currentUser[0].pseudo}
          />
        </View>

        <View style={styles.field}>
          <Text>Votre Adresse </Text>
          <Text>Rue </Text>

          <TextInput
            style={styles.input}
            onChangeText={text => setNewAddress(text)}
            value={newAddress}
            placeholder={currentUser[0] && currentUser[0].address}
          />
          <Text>Code Postal </Text>

          <TextInput
            style={styles.input}
            onChangeText={text => setNewCodePostal(text)}
            value={newCodePostal}
            placeholder={currentUser[0] && currentUser[0].postal_code}
          />
          <Text>Ville </Text>

          <TextInput
            style={styles.input}
            onChangeText={text => setNewVille(text)}
            value={newVille}
            placeholder={currentUser[0] && currentUser[0].ville}
          />
        </View>

        <View style={styles.field}>
          <Text>Votre Description </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewDescription(text)}
            value={newDescription}
            placeholder={currentUser[0] && currentUser[0].description}
          />
        </View>

        <View style={styles.field}>
          <Text>Votre bio </Text>

          <TextInput
            style={styles.input}
            onChangeText={text => setNewBio(text)}
            value={newBio}
            placeholder={currentUser[0] && currentUser[0].bio}
          />
        </View>

        <TouchableOpacity style={styles.buttonSmall} onPress={handleSubmit}>
          <Text>Modifier</Text>
        </TouchableOpacity>

        <View style={styles.field}>
          <Text>Votre adresse email </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewEmail(text)}
            value={newEmail}
            placeholder={currentUser[0] && currentUser[0].email}
          />
        </View>
        <View style={styles.field}>
          <Text>Nouveau mot de passe </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewUsername(text)}
            value={newUsername}
            placeholder={"******"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.field}>
          <Text>Confirmer votre nouveau mot de passe </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewUsername(text)}
            value={newUsername}
            placeholder={"******"}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.buttonSmall} onPress={handleSubmit}>
          <Text>Modifier votre mot de passe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  field: {
    margin: 0,
    padding: 10
  },
  input: {
    width: "95%",

    fontSize: 12,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1
    //textAlign: "center"
  },
  button: {
    height: 70,
    backgroundColor: "white",
    width: "50%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 125
  }
});
