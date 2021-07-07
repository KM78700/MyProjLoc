import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

export default class myLocation extends Component {
  state = {
    location: null,
    errorMessage: null,
    isLocationModalVisible: false,
    regionName: null,
    myCity: ""
  };

  constructor(props) {
    super(props);
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };

  _getRegionName = async () => {
    let reg = await Location.reverseGeocodeAsync({
      longitude: this.state.location.coords.longitude,
      latitude: this.state.location.coords.latitude
    });
    this.setState({ regionName: reg[0] });
  };

  render() {
    let text = "Waiting..";
    let long = "?";
    let lat = "?";

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      long = this.state.location.coords.longitude;
      lat = this.state.location.coords.latitude;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>longitude : {long}</Text>
        <Text style={styles.paragraph}>latitude : {lat}</Text>
        <TouchableOpacity
          style={{ borderColor: "blue", borderWidth: 5, borderRadius: 10 }}
          onPress={this._getRegionName}
        >
          <Text
            style={{
              fontSize: 30,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 50,
              marginRight: 50
            }}
          >
            Get ADDRESS
          </Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          city : {this.state.regionName ? this.state.regionName.city : ""}
        </Text>
        <Text style={styles.paragraph}>
          country : {this.state.regionName ? this.state.regionName.country : ""}
        </Text>
        <Text style={styles.paragraph}>
          isoCountryCode :{" "}
          {this.state.regionName ? this.state.regionName.isoCountryCode : ""}
        </Text>
        <Text style={styles.paragraph}>
          name : {this.state.regionName ? this.state.regionName.name : ""}
        </Text>

        <Text style={styles.paragraph}>
          region : {this.state.regionName ? this.state.regionName.region : ""}
        </Text>
        <Text style={styles.paragraph}>
          street : {this.state.regionName ? this.state.regionName.street : ""}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 10,
    fontSize: 18
  }
});
