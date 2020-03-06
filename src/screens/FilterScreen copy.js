import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Slider,
  TouchableOpacity,
  Switch
} from "react-native";

import Stars from "../components/Stars";
import FilterSubmit from "../components/FilterSubmit";
import { GlobalFilter } from "../constants/FilterGroups";
//import { TabView, SceneMap } from "react-native-tab-view";

// const GoodsRoute = () => (
//   <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
// );

// const ServicesRoute = () => (
//   <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
// );

//const initialLayout = { width: Dimensions.get("window").width };

export default FilterScreen = () => {
  const [pathLength, setPathLength] = useState(100);
  const [prestationValue, setPrestationValue] = useState([]);
  const starsList = [false, false, false, true, false];

  // const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   { key: "servicesRoute", title: "Services" },
  //   { key: "goodsRoute", title: "Biens" }
  // ]);

  // const renderScene = SceneMap({
  //   servicesRoute: ServicesRoute,
  //   goodsRoute: GoodsRoute
  // });

  const filterApply = () => {
    console.warn("filtre appliqué");
  };

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        {/* <Button style={styles.btnTab} title="Services"></Button>
        <Button style={styles.btnTab} title="Biens"></Button> */}
      </View>

      <View style={styles.services}>
        <Text style={styles.text}>Rayon personnalisé </Text>
        <Text style={styles.subText}>
          Me montrer seulement les annonces dans un rayon donnée{" "}
        </Text>
        <View style={styles.sliderZone}>
          <Slider
            style={styles.slider}
            step={1}
            maximumValue={100}
            value={pathLength}
            onValueChange={sliderValue => setPathLength(sliderValue)}
          />
          <Text style={styles.sliderText}>{pathLength} KM</Text>
        </View>

        {GlobalFilter.ServicesFilters &&
          GlobalFilter.ServicesFilters.map((elem, index) => {
            return (
              <View key={index}>
                {!elem.isGlobalFilter ? (
                  <View style={styles.presta}>
                    <Switch
                      //onValueChange={() => {}}
                      style={styles.prestaSwitch}
                      value={elem.selected}
                    />

                    <Text style={styles.prestaText}>
                      {elem.titre1 + " " + elem.titre2}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        {starsList.map((elem, index) => {
          return (
            <TouchableOpacity style={styles.stars} onPress={() => {}}>
              <Stars
                style={styles.stars}
                rate={index + 1}
                taille={25}
                filtre={true}
                canSelect={true}
                selected={elem}
              ></Stars>
            </TouchableOpacity>
          );
        })}
      </View>
      <FilterSubmit
        text={"Appliquer Fitre"}
        onPress={filterApply}
      ></FilterSubmit>
    </View>

    // <TabView
    //   navigationState={{ index, routes }}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={initialLayout}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "dotted"
  },
  tab: { height: "10%" },
  btnTab: {
    width: "70",
    backgroundColor: "green"
  },
  services: { borderColor: "blue", borderWidth: 1, borderStyle: "dotted" },
  text: {
    width: "80%",
    marginHorizontal: "10%",
    marginTop: "10%"
  },
  subText: {
    width: "80%",
    marginLeft: "10%",
    fontSize: 12,
    color: "silver"
  },
  stars: {
    marginHorizontal: "10%",
    marginVertical: 3
  },
  presta: {
    marginVertical: 2,
    paddingVertical: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  prestaText: {
    paddingLeft: 20,
    fontSize: 20
  },
  slider: {
    width: "75%"
  },
  sliderZone: {
    padding: 10
  },
  sliderText: {
    top: 20,
    position: "absolute",
    right: 20,
    fontSize: 20
  },
  scene: {
    flex: 1
  }
});
