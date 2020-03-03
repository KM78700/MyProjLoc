import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import styles from "../../styles";

export default Details = () => {
  const navigation = useNavigation();

  // const onChatClick = event => {
  //   navigation.navigate("Chat", {
  //     userID: 86,
  //     Form: "Notification"
  //   });
  // };

  const onChatClick = event => {
    navigation.navigate("Chat");
  };
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
          justifyContent: "space-around"
        }}
      >
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
              name={"pencil-square"}
              size={30}
            />
            <Text>Ajouter un avis</Text>
          </View>
        </TouchableOpacity>
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
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    width: "80%",
    marginHorizontal: "10%",
    marginTop: "10%"
  }
});
