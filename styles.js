import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  containerAuth: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
    //justifyContent: "center",
    //width:"100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  containerAvis: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    // justifyContent: "center",
    width: "100%"
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row"
  },
  containerPost: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 0
    // justifyContent: "center"
  },
  logo: {
    padding: 30,
    fontSize: 35,
    fontWeight: "bold",
    color: "#171F33",
    // borderColor: "#d3d3d3",
    // borderBottomWidth: 1,
    textAlign: "center"
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  googleButton: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  facebookText: {
    color: "white",
    fontSize: 18
  },
  border: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  postPhoto: {
    // marginBottom: 20,
    height: 250,
    width: width
  },
  roundImage: {
    flex: 1,
    width: "80%",
    height: "80%",
    borderRadius: 20,
    margin: 5,
    backgroundColor: "lightgrey"

    // alignItems: "center",
    // justifyContent: "center"
  },
  cameraButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 50
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 125
  },
  style1: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold"
  },
  style2: {
    marginTop: 8,
    marginLeft: 20,
    fontSize: 16
  },
  titleAvis: {
    marginTop: 20,
    paddingLeft: 20,
    backgroundColor: "#eee",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
