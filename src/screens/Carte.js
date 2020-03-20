import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import FirebaseContext from "../firebase/FirebaseContext";

import { Theme } from "../constants/GlobalConstantes";
import MapButtonsBar from "../components/MapButtonsBar";
import { IconButton, Colors } from "react-native-paper";

export default function Map(props) {
  console.log(props);
  let map: any;
  const { user, firebase } = useContext(FirebaseContext);
  const [prestataires, setPrestataires] = useState([]);

  const [mapState, setMapState] = useState({
    latitude: 48.8588377,
    longitude: 2.2770206,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8
  });

  const { locations } = props;
  const navigation = useNavigation();

  const onCenter = () => {
    console.log("center map");
  };

  const onDeltaPlus = () => {
    let newZoom = mapState.latitudeDelta * 0.5;
    let region = {
      latitude: mapState.latitude,
      longitude: mapState.longitude,
      latitudeDelta: newZoom < 0.0004 ? mapState.latitudeDelta : newZoom,
      longitudeDelta: newZoom < 0.0004 ? mapState.latitudeDelta : newZoom
    };
    setMapState(region);
    map.animateToRegion(region, 100);
  };

  const onDeltaMinus = () => {
    let newZoom = mapState.latitudeDelta * 2;
    let region = {
      latitude: mapState.latitude,
      longitude: mapState.longitude,
      latitudeDelta: newZoom > 200 ? mapState.latitudeDelta : newZoom,
      longitudeDelta: newZoom > 200 ? mapState.latitudeDelta : newZoom
    };
    setMapState(region);
    map.animateToRegion(region, 100);
  };

  useEffect(() => {
    firebase.db
      .collection("users")
      //.orderBy("createAt", "asc")
      .onSnapshot(snapshot => {
        const dataPrestataires = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPrestataires(dataPrestataires);
      });
  }, [firebase]);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, height: "100%", width: "100%" }}
        region={mapState}
        initialRegion={{
          latitudeDelta: 0.1,
          longitudeDelta:
            (Dimensions.get("window").width / Dimensions.get("window").height) *
            0.1
        }}
        showsUserLocation={true}
        zoomEnabled={true}
        ref={ref => (map = ref)}
      >
        {prestataires &&
          prestataires &&
          prestataires.map(prest => {
            return (
              prest.coordinates && (
                <Marker
                  key={prest.uid}
                  image={require("../../assets/pin.png")}
                  coordinate={{
                    latitude: prest.coordinates.latitude,
                    longitude: prest.coordinates.longitude
                  }}
                >
                  <Callout
                  // onPress={() =>
                  //   navigation.navigate("PrestaDetail", { id: prest.uid })
                  // }
                  >
                    {/* <RateAndTitle prest={prest} taille={"S"} /> */}
                    <View>
                      <Text>{prest.email}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            );
          })}
      </MapView>
      <MapButtonsBar
        onDeltaPlus={onDeltaPlus}
        onDeltaMinus={onDeltaMinus}
        onCenter={onCenter}
      ></MapButtonsBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //opacity: 0.5
  },
  mapButtonsBar: {
    position: "absolute",
    zIndex: 1
  }
});
