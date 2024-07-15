import { useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { styles } from "../constants/styles";

export default function Index({ navigation }:any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
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
        onPress={() =>
          username === "A" && password === "A"
            ? navigation.push('(tabs)')
            : console.log("Usuario e senha incorretos")
        }
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}
