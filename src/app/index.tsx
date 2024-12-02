// import { Pressable, Text, View } from "react-native";

// export default function Index() {
//   function myFunc() {
//     const func = new Function(`
//           fetch("https://www.caae.org.br/backend/receber_dados.php")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Dados recebidos:", data);
//       })
//       .catch((error) => console.error("Erro ao receber dados:", error));`)
//     func()
//   }
//   return (
//     <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//       <Text>Olá Mundo</Text>
//       <Pressable
//         onPress={myFunc}
//         style={{
//           backgroundColor: "blue",
//           height: 30,
//           width: 150,
//           borderRadius: 10,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "white" }}>Press me!</Text>
//       </Pressable>
//     </View>
//   );
// }

// Primeira pagina acessada pelo aplicativo
// A função é navegar para dentro do aplicativo

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
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

  function receberDados() {
    fetch("https://www.caae.org.br/backend/receber_dados.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
      })
      .catch((error) => console.error("Erro ao receber dados:", error));
  }

  function enviarDados() {
    if (nome.length < 3 && valor.length < 3) {
      console.log("Tamanho menor que 3");
    }
    {
      fetch("https://www.caae.org.br/backend/enviar_dados.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          valor: valor,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.mensagem);
        })
        .catch((error) => console.error("Erro ao enviar dados:", error));
      setNome("");
      setValor("");
    }
  }

  function loopTime(limit: number = 0) {
    if (limit > 120) {
      return;
    }
    limit++;
    setTimeout(() => {
      console.log(nome,limit);
      loopTime(limit);
    }, 3000);
  }

  useEffect(() => {loopTime()}, []);

  return (
    <View style={styles.containerScrollView}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("modules")}
      >
        <Text style={styles.buttonText}>Navigate</Text>
      </Pressable>
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
      {/* <Pressable
        style={styles.button}
        onPress={() => getData().then((data: ModuleParam) => setAppJson(data))}
      >
        <Text style={{...styles.buttonText}}>setAppJson(Get data)</Text>
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
      <Text style={{color: "white"}}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{ backgroundColor: "white", width: 200, height: 30, margin: 5 }}
      />
      <Text style={{color: "white"}}>Valor</Text>

      <TextInput
        value={valor}
        onChangeText={setValor}
        style={{ backgroundColor: "white", width: 200, height: 30, margin: 5 }}
      />

      <Pressable style={styles.button} onPress={enviarDados}>
        <Text style={styles.buttonText}>Enviar Dados</Text>
      </Pressable>*/}

      {/* <Pressable style={styles.button} onPress={receberDados}>
        <Text style={styles.buttonText}>Receber Dados</Text>
      </Pressable> */}
      <TextInput style={{backgroundColor: "white", width: 100, padding: 5}} value={nome} onChangeText={setNome}/>
      <Pressable style={styles.button} onPress={() => console.log(nome)}>
        <Text style={styles.buttonText}>Receber Dados</Text>
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

  buttonText: { color: "#ffffff" },
  buttonText2: {
    color: "red",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
});
