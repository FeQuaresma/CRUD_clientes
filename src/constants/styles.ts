import { StyleSheet } from "react-native";

const fontSizeDefault = 20;
const widthDefault = 250;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  inputLabel: {
    fontSize: fontSizeDefault,
    color: "#ffffff",
  },
  input: {
    fontSize: fontSizeDefault,
    height: 30,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: widthDefault,
  },
  inputBox: {
    fontSize: fontSizeDefault,
    height: 60,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: widthDefault,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  }, dropdown: {
    fontSize: fontSizeDefault
  }, createFormView: {
  }, dropdownMulti: {
    fontSize: fontSizeDefault/2,
    flexDirection: "column"
  },  buttonFile: {
    backgroundColor: "#d80000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTextFile: {
    color: "#ffffff",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
});

export const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
