import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index({ navigation, e }: any) {



  return (
    <View style={styles.containerScrollView}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("modules")}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => console.log(e)}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
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
