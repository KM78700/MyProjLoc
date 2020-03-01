import React, { useState, useEffect, useContext, useReducer } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import styles from "../../styles";

//-- Import FirebaseContext
import FirebaseContext from "../firebase/FirebaseContext";
import { updateLocale } from "moment";

//--- Universally Unique IDentifiers
import uuid from "uuid";

//--- Reducer
// import post from "../reducer/post";
// import { initializeApp } from "firebase";
// import { onFrameDidUpdate } from "expo/build/AR";

const Post = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const [description, setDescription] = useState("");
  // const [state, dispatch] = useReducer(post, null);

  //Add post
  const addPost = async () => {
    await firebase.uploadPost(description);
  };

  //-- Return
  return (
    <View style={styles.containerPost}>
      <Image
        style={styles.postPhoto}
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/myproj2-634bf.appspot.com/o/villers-sur-mer.jpeg?alt=media&token=1db87c21-d0b8-43a1-8a27-e5e7359bb29c"
        }}
      />

      <TextInput
        style={styles.border}
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
        placeholder="Description"
      />

      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Post;
