import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Rate = props => {
  const { note } = props;

  if (!note) return null;

  const displayStars = rate => {
    const stars = [];
    let i = 0;

    for (; i < rate; i++) {
      stars.push(<Entypo key={i} name="star" size={18} color="#FFB402" />);
    }
    for (; i < 5; i++) {
      stars.push(<Entypo key={i} name="star" size={18} color="grey" />);
    }
    return stars;
  };

  return (
    <View>
      <View style={styles.titleWrapper}>
        <View style={styles.starWrapper}>
          {displayStars(note)}
          <Text> ({note} notes)</Text>
        </View>
      </View>
    </View>
  );
};

export default Rate;

//--------------------------------
//----------- STYLES -------------
//--------------------------------
const styles = StyleSheet.create({
  // container: {
  //   marginTop: 10,
  //   width: "100%",
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between"
  // },
  titleWrapper: {
    flex: 2,
    flexDirection: "column"
  },
  starWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarWrapper: {
    flex: 1,
    alignItems: "flex-end"
  },
  avatar: {
    borderRadius: 50,
    height: 50,
    width: 50
  }
});
