import { Alert } from "react-native";

export interface Json {
  functionCode: string;
  importedFunc: { [key: string]: { import: string; from: string } };
}

const json2: Json = {
  functionCode: "if(!a(b)){c.alert('CPF inválido')}else{c.alert('CPF válido')}",
  importedFunc: {
    a: { import: "validateCPF", from: "validateCPF" },
    b: { import: "valueExported", from: "local" },
    c: { import: "Alert", from: "react-native" },
  },
}

export async function executeFunction(jsonImported: Json, variable: any = undefined) {

  console.log(variable)
  const itemsArray:any[] = [];
  const itemsKeys:any[] = [];
  
  const moduleMap: { [key: string]: () => Promise<any> | any } = {
    "react-native": () => import("react-native"),
    validateCPF: () => import("src/functions/validateCPF"),
    local: () => undefined,
  };

  for (const key of Object.keys(jsonImported.importedFunc)) {
    const { import: importName, from: importSource } =
      jsonImported.importedFunc[key];

    try {
      const importedModule = await moduleMap[importSource]();

      const importedFunc = importedModule
        ? importedModule[importName]
        : variable;

      if (!importedFunc && importedFunc !== "") {
        console.error(`Function ${importName} not found in ${importSource}`);
        continue;
      }

      itemsArray.push(importedFunc)
      
      itemsKeys.push(key)

      console.log(itemsArray, itemsKeys)

    } catch (error) {
      console.error(`Erro ao importar módulo de ${importSource}:`, error);
    }
  }

  const func = new Function(...itemsKeys, jsonImported.functionCode);

  console.log(func.toString())
  func(...itemsArray);
}
