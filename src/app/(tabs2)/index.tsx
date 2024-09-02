import { Pressable, ScrollView, Text, Alert } from "react-native";
import * as React from "react";
import { validateCPF } from "@/src/functions";

function index({ e }: any) {
  <Home {...e} />;
}

export default function Home({ globalFunctions }: any) {
  interface Json {
    functionCode: string;
    functionVar?: string;
    functionValue: string;
    importedFunc: { import: string; from: string };
  }

  // const json: Json = {
  //   functionCode: "a((prev) => ({...prev, functionValue: b}));",
  //   functionVar: "teste Var",
  //   functionValue: "teste Value",
  //   importedFunc: { import: "setJsonState", from: "local" },
  // };

  const json: Json = {
    functionCode: "a.alert('Olá Mundo 2')",
    // functionVar: "Olá Mundo",
    functionValue: "teste Value",
    importedFunc: { import: "Alert", from: "react-native" },
  };

  const [jsonState, setJsonState] = React.useState(json);

  const localFunctions = {
    setJsonState,
  };

  const moduleMap: { [key: string]: () => Promise<any> | any } = {
    "react-native": () => import("react-native"),
    local: () => localFunctions,
  };

  async function executeFunction(jsonImported: Json) {
    const { import: importName, from: importSource } =
      jsonImported.importedFunc;

    const importedModule = await moduleMap[importSource]();

    const importedFunc = importedModule
      ? importedModule[importName]
      : undefined;

    if (!importedFunc) {
      console.error(`Function ${importName} not found in ${importSource}`);
      return;
    }

    const func = new Function("a", "b", jsonImported.functionCode);

    if (jsonImported.functionVar) {
      func(importedFunc, jsonImported.functionVar);
    } else {
      func(importedFunc);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => executeFunction(jsonState)}>
        <Text style={{ fontSize: 30 }}>Func</Text>
      </Pressable>

      <Pressable onPress={() => setJsonState(json)}>
        <Text style={{ fontSize: 30 }}>Go back</Text>
      </Pressable>

      <Text style={{ fontSize: 30 }}>{jsonState.functionValue}</Text>
    </ScrollView>
  );
}
