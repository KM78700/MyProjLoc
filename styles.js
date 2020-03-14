import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "./src/constants/GlobalConstantes";

const { width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  containerAuth: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: Theme.appColorfnac
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
  containerPost: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 0
    // justifyContent: "center"
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row"
  },

  logo: {
    padding: 30,
    fontSize: 35,
    fontWeight: "bold",
    color: Theme.buttonLabelColor,
    // borderColor: "#d3d3d3",
    // borderBottomWidth: 1,
    textAlign: "center"
  },
  googleButton: {
    height: 70,
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookText: {
    color: "white",
    fontSize: 18
  },
  border: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 24,
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
    height: 70,
    backgroundColor: "white",
    width: "50%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
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
    marginTop: 10,
    paddingLeft: 20,
    backgroundColor: "#eee",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  wrapper: {
    height: 230
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "white"
  },
  ImgSwiper: {
    height: "100%",
    width: "100%",
    position: "relative", // because it's parent
    top: 0,
    left: 0
  },
  TextSwiper: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    backgroundColor: "yellow",
    padding: 8,
    borderRadius: 12,
    position: "absolute", // child
    top: 20, // position where you want
    left: 20
  },
  buttonTitle: {
    color: Theme.AppColor,
    fontSize: 25
  },
  buttonBar: {
    position: "absolute",
    zIndex: 1,
    width: "100%"
  },
  buttonBand: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Theme.buttonBandColor,
    borderRadius: 50
  },
  transparentButtonBand: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonLabel: {
    color: Theme.buttonLabelColor
  },
  userItem: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    paddingTop: 5,
    paddingBottom: 5
  },
  profilItem: {
    width: "25%",
    //backgroundColor: "grey",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  profilItemImage: {
    flex: 1,
    width: 70,
    height: 60,
    alignItems: "center",
    // width: "80%",
    // height: "80%",
    resizeMode: "cover",
    borderRadius: 12,
    //margin: 2,
    backgroundColor: "lightgrey"
  },
  profilItemDistance: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "brown"
  },
  descriptionRateAndServices: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
    marginLeft: 15,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  descriptionItem: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-around",
    //backgroundColor: "#eee",
    paddingRight: 15
  }
});
