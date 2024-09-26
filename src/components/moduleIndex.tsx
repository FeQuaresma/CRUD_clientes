import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useEffect } from "react";
import { extractFunctions } from "../functions/functionStringClear";
import { Module, ModuleParam } from "../constants/moduleParamV2";

export default function ModuleIndex({
  moduleName,
  setAppJson,
  moduleObject,
  appJson,
}: any) {
  const carlos: ModuleParam = appJson;
  useEffect(() => {
    if (appJson.modules[moduleObject].stringFunctions) {
  
      const functionsList: any = appJson.modules[moduleObject].stringFunctions
        ? extractFunctions(appJson.modules[moduleObject].stringFunctions)
        : "";
      const functions: { [key: string]: any } = {};
  
      functionsList.forEach((functionArray: any) => {
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
          },
        },
      }));
  
    }
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Menu {moduleName}</Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Navegar</Text>
      </Pressable>
    </ScrollView>
  );
}
