import * as acorn from "acorn";

export function catchTextJs(link: string) {
  return fetch(link)
    .then((response) => response.text())
    .catch((error) => {
      console.error("Erro:", error);
    });
}

export async function extractFunctions(
  stringArray: string,
  moduleName: string
) {
  try {
    let funcNames: string[] = [];
    let varNames: string[] = [];

    let funcArray: [string, string[], string][] = [];
    let varObj: { [key: string]: any } = {};

    function varDisect(declaration: any) {
      for (let i = 0; i < declaration.declarations.length; i++) {
        if (declaration.declarations[i].init === null) {
          varNames.push(declaration.declarations[i].id.name);
          varObj[declaration.declarations[i].id.name] = undefined;
        } else if (
          declaration.declarations[i].init.type !== "ArrowFunctionExpression"
        ) {
          varNames.push(declaration.declarations[i].id.name);
          varObj[declaration.declarations[i].id.name] =
            declaration.declarations[i].init.value;
        } else {
          declaration.declarations[i].init.id = declaration.declarations[i].id;
          funcDisect(declaration.declarations[i].init);
        }
      }
    }

    function funcDisect(declaration: any) {
      if (stringArray) {
        let funcName = declaration.id.name;
        let funcParam: string[] = declaration.params.map(
          (item: any) => item.name
        );
        let funcBody = stringArray
          .slice(declaration.body.start + 1, declaration.body.end - 1)
          .trim();
        funcNames.push(funcName);
        funcArray.push([funcName, funcParam, funcBody]);
      }
    }

  

    // const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
    // stringArray = stringArray.replace(commentRegex, "");

    // let acorn = require("acorn");
    const acornObject = acorn.parse(stringArray, {
      ecmaVersion: "latest",
    }).body;


    for (let i = 0; i < acornObject.length; i++) {
      switch (acornObject[i].type) {
        case "VariableDeclaration":
          varDisect(acornObject[i]);
          break;
        case "FunctionDeclaration":
          funcDisect(acornObject[i]);
          break;
      }
    }

    funcArray.forEach((functionCode) => {
      funcNames.forEach((fnName) => {
        const regex = new RegExp(`\\b${fnName}\\((.*?)\\)`, "g");
        if (functionCode[2].match(regex)) {
          
          functionCode[2] = functionCode[2].replace(regex, (match, group1) => {
              // Verifica se o primeiro grupo de captura (os parâmetros) está vazio
              if (group1.trim() === "") {
                // Se vazio, retorna a substituição sem parâmetros adicionais
                return `appJson.modules.${moduleName}.functions.${fnName}(appJson)`;
              } else {
                // Caso contrário, insere os parâmetros capturados e o appJson
                return `appJson.modules.${moduleName}.functions.${fnName}(${group1}, appJson)`;
              }
            });
        }
      });

      varNames.forEach((varName) => {
        const regex = new RegExp(`\\b${varName}\\b`, "g");
        if (functionCode[2].match(regex)) {
          functionCode[2] = functionCode[2].replace(
            regex,
            `appJson.modules.${moduleName}.variables.${varName}`
          );
        }
      });


      if (!functionCode[1].includes("appJson")) {
        functionCode[1].push("appJson");
      }

    });

    // console.log("vars: ", varNames);
    // console.log("vars: ", varObj);
    // console.log("funcs: ", funcNames);
    // console.log("funcs: ", funcArray);
    // console.log({ variables: varArray, functions: funcArray });
    return { variables: varObj, functions: funcArray, varNames, funcNames };
  } catch (e) {
    console.error("catch e:", e);
  }
}
