import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import GlobalFilter from "../constants/FilterGroups";
import FiltreButton from "./FiltreButton";
import { Theme } from "../constants/GlobalConstantes";

const FiltresBar = props => {
  [key, useKey] = useState(false);
  const { filterState } = props.filterState;
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: Theme.buttonBandColor
      }}
    >
      {GlobalFilter.ServicesFilters &&
        GlobalFilter.ServicesFilters.map((btn, index) => {
          return (
            <View key={index} style={{ width: btn.width }}>
              <FiltreButton
                code={btn.code}
                caption={btn.caption}
                service={btn.service}
                color={btn.color}
                isGlobalFilter={btn.isGlobalFilter}
                filterState={filterState}
              />
            </View>
          );
        })}
    </View>
  );
};

export default FiltresBar;
