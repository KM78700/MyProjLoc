import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import styles from "../../styles";

const Post = () => {
  //-- Hooks
  const [description, setDescription] = useState("");

  const upload = {
    id: "555555",
    postPhoto:
      "https://firebasestorage.googleapis.com/v0/b/myproj2-634bf.appspot.com/o/villers-sur-mer.jpeg?alt=media&token=376b6522-01fd-4d4d-af02-6ba27fec467b",
    postDescription: description
  };

  const addUser = () => {
    // firebase
    //   .firestore()
    //   .collection("posts")
    //   .add(upload);
    // setDescription("");
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
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />

      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Post;
