// Primeira pagina acessada pelo aplicativo
// A função é navegar para dentro do aplicativo

import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModuleParam } from "../types";

import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import log from "./modules/log";

export default function Index({
  appJson,
  setAppJson,
  navigation,
}: {
  appJson: ModuleParam;
  setAppJson: React.Dispatch<React.SetStateAction<ModuleParam>>;
  navigation: any;
}) {
  const [fileContent, setFileContent] = useState("");
  const fileUri = `${FileSystem.documentDirectory}example.txt`;

  // Função para salvar conteúdo no arquivo
  const saveToFile = async () => {
    try {
      const content = "Hello from Expo FileSystem!";
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log("File written successfully");
    } catch (error) {
      console.log("Error saving file:", error);
    }
  };

  // Função para ler o conteúdo do arquivo
  const readFromFile = async () => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      setFileContent(content);
      console.log("File read successfully");
    } catch (error) {
      console.log("Error reading file:", error);
    }
  };

  // função que acessa o link que resgata o json da internet, e transforma no appJsFFileSystem.ileSystem.on
  async function loadAppJson() {
    let linkURL = "https://www.caaFileSystem.e.org.br/teste/app.json";

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
        onPress={() => getData().then((data: ModuleParam) => setAppJson(data))}
      >
        <Text style={styles.buttonText}>setAppJson(Get data)</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("modules")}
      >
        <Text style={styles.buttonText}>Navigate</Text>
      </Pressable>
      <Pressable
        style={{...styles.button, backgroundColor: "green"}}
        onPress={() => navigation.navigate("camera")}
      >
        <Text style={styles.buttonText}>Câmera</Text>
      </Pressable>
      <Pressable
        style={{...styles.button, backgroundColor: "red"}}
        onPress={() => navigation.navigate("location")}
      >
        <Text style={styles.buttonText}>Location</Text>
      </Pressable>
      <Pressable
        style={{...styles.button, backgroundColor: "purple"}}
        onPress={() => navigation.navigate("notifications")}
      >
        <Text style={styles.buttonText}>Notifications</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={saveToFile}>
        <Text style={styles.buttonText}>Salvar no arquivo</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={readFromFile}>
        <Text style={styles.buttonText}>Ler do Arquivo</Text>
      </Pressable>

      <Text style={styles.buttonText}>Conteúdo do Arquivo: {fileContent}</Text>
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

  buttonText: { color: "#ffffff" },
  buttonText2: {
    color: "red",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
});
