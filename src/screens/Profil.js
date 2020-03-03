import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
  const [newUsername, setNewUsername] = useState();
  const handleChangeUsername = text => {
    setNewUsername(text);
  };
  return (
    <View>
      <Text>Changer votre username </Text>

      <TextInput
        style={{
          height: 40,
          width: 55,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeUsername(text)}
        value={newUsername}
      />
    </View>
  );
}
