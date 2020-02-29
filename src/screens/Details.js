import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import styles from "../../styles";

const Details = () => {
  //-- Function
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

export default Details;
