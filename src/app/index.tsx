import { useEffect, useState } from "react";
import { Pressable, Text, ScrollView } from "react-native";
import { styles } from "../constants/styles";
import { testeF } from "../functions/teste";

export default function Index({ navigation }: any) {
  useEffect(() => {}, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Pressable style={styles.button} onPress={() => testeF()}>
        <Text style={styles.buttonText}>Teste</Text>
      </Pressable>
      {/* <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(tabs)")}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
      </Pressable> */}
    </ScrollView>
  );
}
