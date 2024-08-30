import { Pressable, ScrollView, Text, View } from "react-native";
import * as React from "react";

export default function Home() {
  const json = {
    functionCode: "function showAlert() { Alert.alert('Hello from JSON!'); }",
    importedFunc: { import: "Alert", from: "react-native" },
  };
  // Crie um mapeamento de strings para módulos
  const moduleMap: { [key: string]: () => Promise<any> } = {
    "react-native": () => import("react-native"),
  };

  async function executeFunction() {
    const { import: importName, from: importSource } = json.importedFunc;

    const importedModule = await moduleMap[importSource]();

    const importedFunc = importedModule[importName];

    const func = new Function(importName, "return " + json.functionCode)(
      importedFunc
    );

    func();
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => executeFunction()}>
        <Text>Func</Text>
      </Pressable>
    </ScrollView>
  );
}
