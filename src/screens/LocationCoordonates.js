import React, { Component, useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { IconButton } from "react-native-paper";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

const myLocationCoordonates = () => {
  const [compleatAddress, setCompleatAddress] = useState(
    "208 Boulevard Gallieni 92390"
  );
  const [compleatAddressOut, setCompleatAddressOut] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [accuracy, setAccuracy] = useState("");

  const addressToCoordonate = async () => {
    const coord = await Location.geocodeAsync(compleatAddress);
    if (coord[0]) {
      setLongitude(coord[0].longitude);
      setLatitude(coord[0].latitude);
      setAltitude(coord[0].altitude);
      setAccuracy(coord[0].accuracy);
    }
  };

  const coordonateToAddress = async () => {
    console.log(longitude + "-" + latitude);
    let reg = null;
    try {
      reg = await Location.reverseGeocodeAsync({
        longitude: longitude,
        latitude: latitude
      });
    } catch {}
    console.log(reg);
    if (reg && reg.length > 0) {
      setCompleatAddressOut(
        reg[0].name +
          "\n" +
          reg[0].postalCode +
          "\n" +
          reg[0].city +
          "\n" +
          reg[0].region +
          "\n" +
          reg[0].country
      );
    } else {
      setCompleatAddressOut("Adresse inconnue");
    }
  };

  return (
    <View style={localStyles.container}>
      <Text>Address</Text>
      <TextInput
        onChangeText={text => {
          setCompleatAddress(text);
        }}
        style={[localStyles.field]}
      >
        {compleatAddress}
      </TextInput>
      <Text style={{ color: "red" }}>{compleatAddressOut}</Text>
      <View style={localStyles.containerButtons}>
        <TouchableOpacity style={localStyles.btn} onPress={addressToCoordonate}>
          <IconButton style={localStyles.btnIco} icon="rocket" size={20} />
          <Text style={localStyles.btnText}>Address to coordonates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.btn} onPress={coordonateToAddress}>
          <Text style={localStyles.btnText}>Coordonates to address </Text>
          <IconButton style={localStyles.btnIco} icon="rocket" size={20} />
        </TouchableOpacity>
      </View>
      <Text>Longitude</Text>
      <TextInput
        onChangeText={text => {
          setLongitude(text);
        }}
        style={localStyles.field}
      >
        {longitude}
      </TextInput>
      <Text>Latitude</Text>
      <TextInput
        onChangeText={text => {
          setLatitude(text);
        }}
        style={localStyles.field}
      >
        {latitude}
      </TextInput>
      <Text>Altitude</Text>
      <TextInput
        onChangeText={text => {
          setAltitude(text);
        }}
        style={localStyles.field}
      >
        {altitude}
      </TextInput>
      <Text>Accuracy</Text>
      <TextInput
        onChangeText={text => {
          setAccuracy(text);
        }}
        style={localStyles.field}
      >
        {accuracy}
      </TextInput>
    </View>
  );
};
export default myLocationCoordonates;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  btn: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 10,
    width: 180,
    margin: 5
  },
  btnIco: {
    width: 160
  },
  btnText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center"
  },
  field: {
    height: 50,
    width: "80%",
    borderColor: "#0000FF",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20
  },
  textArea: {
    height: 120,
    justifyContent: "flex-start"
  }
});
