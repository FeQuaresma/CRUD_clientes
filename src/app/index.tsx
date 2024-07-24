import { useState } from "react";
import { Pressable, TextInput, View, Text, ScrollView } from "react-native";
import { styles } from "../constants/styles";
import { useNavigationState } from "@react-navigation/native";
import Teste from "./teste";

export default function Index({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const routes = useNavigationState((state) => state.routes);

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Login</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(e) => setUsername(e)}
      />
      <Text style={{ ...styles.inputLabel, color: "black" }}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(tabs)")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("teste")}
      >
        <Text style={styles.buttonText}>Lista</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(routes)}>
        <Text style={styles.buttonText}>Rotas</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("tableTest")}
      >
        <Text style={styles.buttonText}>Table Test</Text>
      </Pressable>
    </ScrollView>
  );
}
