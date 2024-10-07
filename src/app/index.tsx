import { useEffect } from "react";
import { Pressable, Text, ScrollView } from "react-native";
import { styles } from "../constants/styles";

export default function Index({ navigation }: any) {
  useEffect(() => {}, []);
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("(modules)")}
      >
        <Text style={styles.buttonText}>Versão 1</Text>
      </Pressable>
    </ScrollView>
  );
}
