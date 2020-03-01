import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import GradientButton from "react-native-gradient-buttons";
import { Button } from "react-native-paper";
//import { Theme } from "../../constants/Constants";

export default FilterBarButton = props => {
  const { code, caption, onFilterPress, counter, selected, isAll } = props;

  let myCounter = 0;
  if (isAll) {
    myCounter = counter;
  } else {
    myCounter = selected ? 1 : 0;
  }

  return (
    <>
      {myCounter > 0 && (
        <View style={styles.checkedZone}>
          <Text style={styles.checkedText}> {myCounter}</Text>
        </View>
      )}
      {/* <GradientButton
        backgroundColor="#171F33"
        gradientEnd="#000000"
        gradientDirection="diagonal"
        style={styles.btnStyle}
        textStyle={{ fontSize: 12 }}
        height={50}
        width={"22%"}
        radius={12}
        impact
        impactStyle="Light"
        onPressAction={onFilterPress}
      >
        {caption}
      </GradientButton> */}
      <Button style={styles.btnStyle} onPress={onFilterPress}>
        {caption}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  checkedZone: {
    width: 22,
    height: 22,
    left: 100,
    top: 0,
    position: "relative",
    zIndex: 10,
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: "green"
  },
  checkedText: {
    color: "white",
    fontSize: 12,
    textAlign: "center"
  },
  btnStyle: {
    // backgroundColor: "white",
    // borderRadius: 12,
    // height: 50,
    // width: "25%",
    // color: "black"

    // borderWidth: 0.5,
    // borderColor: "lightgray",
    backgroundColor: "white",
    // borderRadius: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    width: "25%"
  }
});
