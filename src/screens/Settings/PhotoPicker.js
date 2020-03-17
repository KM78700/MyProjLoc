import React, { useEffect, useState, useContext } from "react";

import { Button, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Permissions from "expo-permissions";
import FirebaseContext from "../../firebase/FirebaseContext";

export default function PhotoPicker(props) {
  const { user, firebase } = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [image, setImage] = useState(null);

  const handleSnapshot = snapshot => {
    snapshot &&
      setCurrentUser(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
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
  }, []);

  useEffect(() => {
    getPermissionAsync();
  });

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    //  console.log(result);
    //  console.log(currentUser[0].photo);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title={props.label} onPress={_pickImage} />
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : currentUser[0] ? (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: currentUser[0].photo }}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
