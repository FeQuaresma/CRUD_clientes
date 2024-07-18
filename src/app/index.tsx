import { useState } from "react";
import { Pressable, TextInput, View, Text, ScrollView } from "react-native";
import { styles } from "../constants/styles";
import { useNavigationState } from "@react-navigation/native";

export default function Index({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const routes = useNavigationState(state => state.routes);
  
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Login</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(e) => setUsername(e)}
      />
      <Text style={styles.inputLabel}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.push("(tabs)")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => console.log(routes)}
      >
        <Text style={styles.buttonText}>Rotas</Text>
      </Pressable>
    </ScrollView>
  );
}
