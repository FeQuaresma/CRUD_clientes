import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useEffect, useState } from "react";
// import { extractFunctions } from "../functions/functionStringClear";
import { Module, ModuleParam } from "../constants/moduleParamV2";
import { teste, teste2 } from "../functions/extractFunctions";

export default function ModuleIndex({
  moduleName,
  setAppJson,
  moduleObject,
  appJson,
}: any) {
  // const [count, setcount] = useState(0)
  let counter = 0;
  useEffect(() => {
    if (appJson.modules[moduleObject].stringFunctions) {
      // const functionsList: any = appJson.modules[moduleObject].stringFunctions
      //   ? extractFunctions(appJson.modules[moduleObject].stringFunctions)
      //   : "";
      // const functions: { [key: string]: any } = {};
      // functionsList.forEach((functionArray: any) => {
      //   const func = new Function(...functionArray[1], functionArray[2]);
      //   functions[functionArray[0]] = (...args: any[]) => func(...args);
      // });
      // setAppJson((prevForm: ModuleParam) => ({
      //   ...prevForm,
      //   modules: {
      //     ...prevForm.modules,
      //     [moduleObject]: {
      //       ...prevForm.modules[moduleObject],
      //       functions: functions,
      //     },
      //   },
      // }));
    }
  }, []);

  async function createStringFunc() {
    let finalString = "";
    for (
      let i = 0;
      i < appJson.modules[moduleObject].stringFunctions.length;
      i++
    ) {
      if (isValidUrl(appJson.modules[moduleObject].stringFunctions[i])) {
        const result = await teste(appJson.modules[moduleObject].stringFunctions[i]); // Aguarda o retorno do fetch
        finalString += result; // Concatena o resultado da função teste
      } else {
        finalString += appJson.modules[moduleObject].stringFunctions[i] + "\n";
      }
    }
    // teste().then((e) => teste2(e));
    console.log(finalString)
  }

  function isValidUrl(e: string) {
    try {
      new URL(e);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Menu {moduleName}</Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Navegar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={createStringFunc}>
        <Text style={styles.buttonText}>Teste</Text>
      </Pressable>
    </ScrollView>
  );
}
