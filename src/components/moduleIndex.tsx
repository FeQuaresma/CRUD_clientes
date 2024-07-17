import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNavigationState } from '@react-navigation/native';

export default function ModuleIndex({ moduleName }:any) {
  const route = useRoute();
  const data:any = route.params;
  console.log(data)
  const [field, setField] = useState("");
  const [info, setInfo] = useState("");
  const navigation:any = useNavigation();

  const routes = useNavigationState(state => state.routes);

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Menu {moduleName}</Text>
      {data && <Text style={styles.inputLabel}>Param: {data.data}</Text>}
      <Text style={styles.inputLabel}>Field</Text>
      <TextInput
        style={styles.input}
        value={field}
        onChangeText={(e) => setField(e)}
      />
      <Text style={styles.inputLabel}>Data</Text>
      <TextInput
        style={styles.input}
        value={info}
        onChangeText={(e) => setInfo(e)}
      />
      <Pressable style={styles.button} onPress={() => console.log(routes)}>
        <Text style={styles.buttonText} >Rotas</Text>
      </Pressable>
      
      <Pressable style={styles.button} onPress={() => navigation.navigate(field, {data: info})}>
        <Text style={styles.buttonText} >Navegar</Text>
      </Pressable>
    </ScrollView>
  );
}
