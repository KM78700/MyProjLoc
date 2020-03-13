import React, { useState, Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Slider,
  TouchableOpacity,
  Switch
} from "react-native";

import Stars from "../components/Stars";
import { GlobalFilter } from "../constants/FilterGroups";
import { useNavigation } from "@react-navigation/core";

export default function FilterScreen() {
  const navigation = useNavigation();
  const [pathLength, setPathLength] = useState(GlobalFilter.Rayon);
  const [minStars, setMinStars] = useState(GlobalFilter.MinStars - 1);

  const [menage, setMenage] = useState(false);
  const [accueil, setAccueil] = useState(false);
  const [travau, setTravau] = useState(false);

  const [prestationValue, setPrestationValue] = useState([]);
  const starsList = [false, false, false, true, false];
  const [selectedStars, setSelectedStars] = useState(0);

  const onAppliquerFilter = () => {
    console.log(GlobalFilter);
    navigation.navigate("Home");
  };

  useEffect(() => {
    setMenage(GlobalFilter.ServicesFilters[0].selected);
    setAccueil(GlobalFilter.ServicesFilters[1].selected);
    setTravau(GlobalFilter.ServicesFilters[2].selected);
  }, []);

  const getServiceState = elem => {
    if (elem.code === "FILTER_1") return menage;
    else if (elem.code === "FILTER_2") return accueil;
    else if (elem.code === "FILTER_3") return travau;
    else return false;
  };

  return (
    <View>
      <View>
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
            onValueChange={sliderValue => {
              setPathLength(sliderValue);
              GlobalFilter.Rayon = sliderValue;
            }}
          />
          <Text style={styles.sliderText}>{pathLength} KM</Text>
        </View>
      </View>
      {GlobalFilter.ServicesFilters &&
        GlobalFilter.ServicesFilters.map((elem, index) => {
          return (
            <View key={index}>
              {!elem.isGlobalFilter ? (
                <View style={styles.presta}>
                  <Text style={styles.prestaText}>{elem.caption}</Text>
                  <Switch
                    style={styles.prestaSwitch}
                    onValueChange={() => {
                      if (elem.code === "FILTER_1") setMenage(!menage);
                      else if (elem.code === "FILTER_2") setAccueil(!accueil);
                      else if (elem.code === "FILTER_3") setTravau(!travau);
                    }}
                    value={getServiceState(elem)}
                  />
                </View>
              ) : null}
            </View>
          );
        })}
      {starsList.map((elem, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.stars}
            onPress={() => {
              setMinStars(index);
              GlobalFilter.MinStars = index + 1;
            }}
          >
            <Stars
              style={styles.stars}
              rate={index + 1}
              taille={25}
              filtre={true}
              canSelect={true}
              selected={index === minStars}
            ></Stars>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={onAppliquerFilter}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Appliquer Filtre</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "space-between"
  },
  prestaSwitch: { marginHorizontal: 25 },
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
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    margin: 20,
    backgroundColor: "blue"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
