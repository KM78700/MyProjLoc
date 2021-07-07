import React, { useState, useEffect, useContext, useReducer } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import styles from "../../../styles";

//--- Navigation
import { useNavigation } from "@react-navigation/core";

//-- Import FirebaseContext
import FirebaseContext from "../../firebase/FirebaseContext";
import { updateLocale } from "moment";

import uuid from "uuid";

function PostService({ route, navigation }) {
  const { type } = route.params;

  const { user, firebase } = useContext(FirebaseContext);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  console.log();
  const uploadPost = async () => {
    if (!price || !description) {
      alert("Veuillez compléter avant de soumettre");
    } else {
      const id = uuid.v4();

      //--- upload
      const upload = {
        id: id,
        category_code: type,
        postPhoto:
          "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/koala.jpg?alt=media&token=57861261-d7f9-44c8-8c86-8c296f1c06d8",
        description: description && description,
        price: price,
        user_uid: user.uid
      };
      await firebase.db
        .collection("services")
        .doc(id)
        .set(upload);
      navigation.goBack();
    }
  };

  const addPost = async description => {
    // await firebase.uploadPost(description, type);
    uploadPost();
  };
  //-- Return
  return (
    <View style={styles.containerPost}>
      <TextInput
        style={styles.border}
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
        placeholder="Description"
      />

      <TextInput
        style={styles.border}
        value={price}
        onChangeText={text => {
          setPrice(text);
        }}
        placeholder="Prix"
      />

      <TouchableOpacity style={styles.button} onPress={() => addPost()}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PostService;
