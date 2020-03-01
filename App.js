import React from "react";
import { StatusBar, Text, View, Button, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
console.disableYellowBox = true;

//--- Base-64
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

//--- Screens
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Details from "./src/screens/Details";
import Info from "./src/screens/Info";
import Post from "./src/screens/Post";
import Plus from "./src/screens/Plus";

//--- Components
import InfoBtnHeader from "./src/components/InfoBtnHeader";
import PrestaBtnHeader from "./src/components/PrestaBtnHeader";

//--- TabNavigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/navigation/TabNavigator";
const Stack = createStackNavigator();

//--- Firebase
import firebase from "./src/firebase/firebase";
import FirebaseContext from "./src/firebase/FirebaseContext";
import useAuth from "./src/hooks/useAuth";

const App = () => {
  const user = useAuth();

  //--- option
  const option = {
    headerStyle: { backgroundColor: "transparente" },
    headerTitleStyle: { color: "white", fontSize: 25 },
    title: "",
    headerBackTitle: " ",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  //-- optionHeader
  const optionHeader = {
    headerStyle: { backgroundColor: "#171F33", height: 90 },
    headerTitle: () => (
      <Text style={{ color: "white", fontSize: 25 }}>MyProject</Text>
    ),
    headerLeft: () => <InfoBtnHeader />,
    headerRight: () => <PrestaBtnHeader />
  };

  //--- optionHeaderDetails
  const optionHeaderDetails = {
    headerStyle: { backgroundColor: "#171F33", height: 90 },
    headerTitle: () => (
      <Text style={{ color: "white", fontSize: 25 }}>MyProject</Text>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => console.log("")}></TouchableOpacity>
    )
  };

  //--- Return
  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={option} name="Login" component={Login} />
          <Stack.Screen options={option} name="Signup" component={Signup} />
          <Stack.Screen
            options={optionHeaderDetails}
            name="Details"
            component={Details}
          />
          <Stack.Screen
            options={optionHeaderDetails}
            name="Post"
            component={Post}
          />
          <Stack.Screen
            options={optionHeaderDetails}
            name="Info"
            component={Info}
          />

          <Stack.Screen
            options={optionHeader}
            name="Home"
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseContext.Provider>
  );
};

export default App;
