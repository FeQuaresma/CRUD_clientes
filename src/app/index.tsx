// Primeira pagina acessada pelo aplicativo
// A função é navegar para dentro do aplicativo

import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModuleParam } from "../types";

export default function Index({
  appJson,
  setAppJson,
  navigation,
}: {
  appJson: ModuleParam;
  setAppJson: React.Dispatch<React.SetStateAction<ModuleParam>>;
  navigation: any;
}) {

  // função que acessa o link que resgata o json da internet, e transforma no appJson
  async function loadAppJson() {
    let linkURL = "https://www.caae.org.br/teste/app.json";

    try {
      const response = await fetch(linkURL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Função que resgata os dados do armazenamento interno do celular em forma de json para recriar o último estado do appJson 
  async function getData(): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem("myAppJson");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
      return appJson;
    }
  }


  // Função que guarda o estado atual do appJson no armazenamento interno do celular
  async function storeData(value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("myAppJson", jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.containerScrollView}>
      {/* <Pressable style={styles.button} onPress={() => storeData(null)}>
        <Text style={styles.buttonText}>Reset Storage</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => storeData(appJson)}>
        <Text style={styles.buttonText}>Set New Storage</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => getData().then((data: ModuleParam) => setAppJson(data))}
      >
        <Text style={styles.buttonText}>setAppJson(Get data)</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() =>
          loadAppJson().then((data: ModuleParam) => setAppJson(data))
        }
      >
        <Text style={styles.buttonText}>setAppJson(loadAppJson)</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => getData().then((data: ModuleParam) => console.log(data))}
      >
        <Text style={styles.buttonText}>console.log(getData)</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(appJson)}>
        <Text style={styles.buttonText}>console.log(appJson)</Text>
      </Pressable> */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("modules")}
      >
        <Text style={styles.buttonText}>Navigate</Text>
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
