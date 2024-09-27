import { moduleMap } from "../constants/importModules";

export interface FunctionJson {
  functionCode: string;
  importedFunc: { [key: string]: { import: string; from: string } };
}

const json2: FunctionJson = {
  functionCode: "if(!a(b)){c.alert('CPF inválido')}else{c.alert('CPF válido')}",
  importedFunc: {
    a: { import: "validateCPF", from: "validateCPF" },
    b: { import: "variable", from: "local" },
    c: { import: "Alert", from: "react-native" },
  },
};

export async function executeFunction(
  jsonImported: FunctionJson,
  variable: any = undefined
) {
  console.log(variable.cnpjcpf.value)
  const itemsArray: any[] = [];
  const itemsKeys: any[] = [];
  let importedFunc:any;

  for (const key of Object.keys(jsonImported.importedFunc)) {
    const { import: importName, from: importSource } =
      jsonImported.importedFunc[key];

    try {

      if (importSource !== "local") {
        const importedModule = await moduleMap[importSource]();
        importedFunc = importedModule[importName];
      } else {
        importedFunc = variable;
      }

      if (!importedFunc && importedFunc !== "") {
        console.error(`Function ${importName} not found in ${importSource}`);
        continue;
      }

      itemsArray.push(importedFunc);
      itemsKeys.push(key);


    } catch (error) {
      console.error(`Import Error ${importSource}:`, error);
    }
  }
  console.log(itemsArray, itemsArray)
  const func = new Function(...itemsKeys, jsonImported.functionCode);

  func(...itemsArray);
}
