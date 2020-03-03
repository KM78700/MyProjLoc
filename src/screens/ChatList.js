import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const ChatList = () => {
  //--- Function

  //--- Return
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Chat</Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        Liste des prestataires en relation via le chat
      </Text>
      <Text style={{ fontSize: 20, color: "#909090" }}>
        A trier par date du dernier Chat
      </Text>
    </View>
  );
};

export default ChatList;
