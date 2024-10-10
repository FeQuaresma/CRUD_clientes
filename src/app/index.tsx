import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index({ navigation }: any) {
  const [state, setState] = useState("Pão");

  function queije() {
    setState("Queijo");
  }

  function isQueijo() {
    return state === "Queijo" ? true : false;
  }

  return (
    <View style={styles.containerScrollView}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(modules)")}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => queije()}>
        <Text style={styles.buttonText}>1</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(state)}>
        <Text style={styles.buttonText}>2</Text>
      </Pressable>
    </View>
  );
}

const fontSizeDefault = 20;
const widthDefault = 250;

const styles = StyleSheet.create({
  button: {
    width: widthDefault,
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#ffffff",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },

  containerScrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  buttonText: {},
  buttonText2: {
    color: "red",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
});
