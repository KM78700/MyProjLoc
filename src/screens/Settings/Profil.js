import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import styles from "../../../styles";

//-- Import FirebaseContext
import FirebaseContext from "../../firebase/FirebaseContext";

export default function Profil() {
  const { user, firebase } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState([]);

  const handleSnapshot = snapshot => {
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const user = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCurrentUser(user);
  };
  useEffect(() => {
    const getUsers = () => {
      firebase.db
        .collection("users")
        .where("uid", "==", user.uid)
        .onSnapshot(handleSnapshot);
    };
    return getUsers();
  }, [firebase]);

  const [newUsername, setNewUsername] = useState();
  const [newPseudo, setNewPseudo] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newBio, setNewBio] = useState();

  const handleChangeUsername = text => {
    setNewUsername(text);
  };

  const handleChangePseudo = text => {
    setNewPseudo(text);
  };

  const handleChangeBio = text => {
    setNewBio(text);
  };

  const handleChangeEmail = text => {
    setNewEmail(text);
  };

  const handleSubmit = () => {
    firebase.db
      .collection("users")
      .doc(user.uid)
      .update({
        bio: newBio ? newBio : currentUser[0].bio,
        pseudo: newPseudo ? newPseudo : currentUser[0].pseudo,
        email: newEmail ? newEmail : currentUser[0].email,
        username: newUsername ? newUsername : currentUser[0].username
      });

    alert("Modification");
    setNewUsername("");
    setNewPseudo("");
    setNewBio("");
    setNewEmail("");

    //firebase.db.console.log("Modifier les données dans la base de données");
  };

  return (
    <View style={styles.container}>
      {currentUser[0] && (
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: currentUser[0].photo }}
        />
      )}
      <Text>Votre adresse email </Text>

      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeEmail(text)}
        value={newEmail}
        placeholder={currentUser[0] && currentUser[0].email}
      />
      <Text>Votre username </Text>

      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeUsername(text)}
        value={newUsername}
        placeholder={currentUser[0] && currentUser[0].username}
      />
      <Text>Votre pseudo </Text>

      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangePseudo(text)}
        value={newPseudo}
        placeholder={currentUser[0] && currentUser[0].pseudo}
      />

      <Text>Votre bio </Text>

      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeBio(text)}
        value={newBio}
        placeholder={currentUser[0] && currentUser[0].bio}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Modifier</Text>
      </TouchableOpacity>

      <Text>Nouveau mot de passe </Text>
      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeUsername(text)}
        value={newUsername}
        placeholder={"******"}
        secureTextEntry={true}
      />
      <Text>Confirmer votre nouveau mot de passe </Text>
      <TextInput
        style={{
          height: 40,
          width: 225,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeUsername(text)}
        value={newUsername}
        placeholder={"******"}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Modifier votre mot de passe</Text>
      </TouchableOpacity>
    </View>
  );
}