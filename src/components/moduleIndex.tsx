import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useEffect, useState } from "react";
import { Module, ModuleParam } from "../constants/moduleParamV2";
import { catchTextJs, extractFunctions } from "../functions/extractFunctions";

export default function ModuleIndex({
  moduleName,

  appJson,
  getData,
}: any) {



  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Menu {moduleName}</Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Navegar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getData.then((data:any)=> console.log(data.modules.cliente.functions))}>
        <Text style={styles.buttonText}>Get Data</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(appJson.modules.cliente.functions)}>
        <Text style={styles.buttonText}>appJson</Text>
      </Pressable>
    </ScrollView>
  );
}
