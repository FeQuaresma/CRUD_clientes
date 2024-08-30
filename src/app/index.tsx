import * as React from "react";
import { useState } from "react";
import { Pressable, TextInput, Text, ScrollView } from "react-native";
import { styles } from "../constants/styles";

export default function Index({ navigation }: any) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(tabs)")}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(tabs2)")}
      >
        <Text style={styles.buttonText}>Versão 2</Text>
      </Pressable>

    </ScrollView>
  );
}
