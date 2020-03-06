import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import GlobalFilter from "../constants/FilterGroups";
import FiltreButton from "./FiltreButton";

const FiltresBar = () => {
  [key, useKey] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#d4e6f1"
      }}
    >
      {GlobalFilter.ServicesFilters &&
        GlobalFilter.ServicesFilters.map((btn, index) => {
          return (
            <View key={index} style={{ width: btn.width }}>
              <FiltreButton
                title1={btn.titre1}
                title2={btn.titre2}
                service={btn.service}
                color={btn.color}
                isGlobalFilter={btn.isGlobalFilter}
              />
            </View>
          );
        })}
    </View>
  );
};

export default FiltresBar;
