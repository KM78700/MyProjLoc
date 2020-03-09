import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

import { Theme } from "../constants/GlobalConstantes";
import MapButtonsBar from "../components/MapButtonsBar";
import { IconButton, Colors } from "react-native-paper";
//import pin from "../assets/pin";

export default function Map(props) {
  let map: any;
  const [mapState, setMapState] = useState({
    latitude: 48.8588377,
    longitude: 2.2770206,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  });

  const { locations } = props;
  const navigation = useNavigation();

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
    //  setMapZoom(0.1);
  }, []);

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
        {/* {locations &&
          locations.rooms &&
          locations.rooms.map(good => {
            return (
              <Marker
                key={good._id}
                image={require("../assets/pin.png")}
                coordinate={{
                  latitude: good.loc[1],
                  longitude: good.loc[0]
                }}
              >
                <Callout
                  onPress={() =>
                    navigation.navigate("GoodDetail", { id: good._id })
                  }
                  style={{ padding: 10 }}
                >
                  <RateAndTitle good={good} taille={"S"} />
                </Callout>
              </Marker>
            );
          })} */}
      </MapView>
      <MapButtonsBar
        onDeltaPlus={onDeltaPlus}
        onDeltaMinus={onDeltaMinus}
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
