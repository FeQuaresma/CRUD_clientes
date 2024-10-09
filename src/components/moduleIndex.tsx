import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useEffect, useState } from "react";
import { Module, ModuleParam } from "../constants/moduleParamV2";
import { catchTextJs, extractFunctions } from "../functions/extractFunctions";

export default function ModuleIndex({
  moduleName,
  setAppJson,
  moduleObject,
  appJson,
}: any) {
  const [count, setCount] = useState(2)
  useEffect(() => {
    if (appJson.modules[moduleObject].stringFunctions) {
      async function functionList() {
        const itemsObj = await createStringFunc();
        const functions: { [key: string]: any } = {};
        itemsObj?.functions.forEach((functionArray: any) => {
          const func = new Function(...functionArray[1], functionArray[2]);
          functions[functionArray[0]] = (...args: any[]) => func(...args);
        });
        setAppJson((prevForm: ModuleParam) => ({
          ...prevForm,
          modules: {
            ...prevForm.modules,
            [moduleObject]: {
              ...prevForm.modules[moduleObject],
              functions: functions,
              variables: itemsObj?.variables,
              varNames: itemsObj?.varNames,
              funcNames:itemsObj?.funcNames,
            },
          },
        }));
      }
      functionList();
    }
  }, []);

  // useEffect(() => {
  //   const appJsonTemp: ModuleParam = appJson;
  //   if (appJsonTemp.modules[moduleObject]) {
  //     console.log(appJsonTemp.modules[moduleObject].functions);
  //     console.log(appJsonTemp.modules[moduleObject].variables);
  //   }
  // }, [appJson]);

  async function createStringFunc() {
    let finalString = "";
    for (
      let i = 0;
      i < appJson.modules[moduleObject].stringFunctions.length;
      i++
    ) {
      if (isValidUrl(appJson.modules[moduleObject].stringFunctions[i])) {
        const result = await catchTextJs(
          appJson.modules[moduleObject].stringFunctions[i]
        ); // Aguarda o retorno do fetch
        finalString += result; // Concatena o resultado da função teste
      } else {
        finalString += appJson.modules[moduleObject].stringFunctions[i] + "\n";
      }
    }
    return extractFunctions(finalString, moduleName);
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
      <Pressable style={styles.button} onPress={() => {setCount(count*count)}}>
        <Text style={styles.buttonText}>{count}</Text>
      </Pressable>
    </ScrollView>
  );
}
