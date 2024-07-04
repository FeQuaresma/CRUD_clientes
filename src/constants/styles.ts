import { StyleSheet } from "react-native";

const fontsize = 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  inputLabel: {
    fontSize: fontsize,
    color: "#ffffff",
  },
  input: {
    fontSize: fontsize,
    height: 30,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: 200,
  },
  inputBox: {
    fontSize: fontsize,
    height: 60,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: 200,
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
    fontSize: fontsize,
    fontWeight: "bold",
  }, dropdown: {
    fontSize: fontsize
  }, createFormView: {
  }, dropdownMulti: {
    fontSize: fontsize/2,
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
    fontSize: fontsize,
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
