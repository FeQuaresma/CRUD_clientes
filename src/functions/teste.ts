import * as acorn from "acorn-loose";
// let stringArray = `

// //   /* Função para validarCPF ou validar CPNJ */

// //   let teste = 1

// //   var nome = "Carlos"

// //   const testeX = (x,y) => {console.log(x,y)}

// //   function validateCPF(cpf) {

// //     if (cpf.length != 11) {
// //       return false;
// //     } else {
// //       let firstDigit = 0;
// //       let secondDigit = 0;
// //       for (let i = 0; i < 10; i++) {
// //         i < 9 ? (firstDigit += Number(cpf[i]) * (i + 1)) : null;
// //         secondDigit += Number(cpf[i]) * i;
// //       }
// //       firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
// //       // comentario
// //       secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
// //       if (String(firstDigit) != cpf[9] || String(secondDigit) != cpf[10]) {
// //         return false;
// //       } else {
// //         return true;
// //       }
// //     }
// //   }

// //   function validateCNPJ(cnpj) {
// //      if (cnpj.length != 11) {
// //       return false;
// //     } else {
// //       let firstDigit = 0;
// //       let secondDigit = 0;
// //       for (let i = 0; i < 10; i++) {
// //         i < 9 ? (firstDigit += Number(cnpj[i]) * (i + 1)) : null;
// //         secondDigit += Number(cnpj[i]) * i;
// //       }
// //       firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
// //       secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
// //       if (String(firstDigit) != cnpj[9] || String(secondDigit) != cnpj[10]) {
// //         return false;
// //       } else {
// //         return true;
// //       }
// //     }
// //   }

// //   function validateDocumento(cpf) {
// //     if (cpf.length === 11) return validateCPF(cpf);
// //     else if (cpf.length === 14) return validateCNPJ(cnpj);
// //     else return false;
// //   }
// //   `;
let link = "https://caae.org.br/teste/functions.js?7";

async function callJS() {
  try {
    const response = await fetch(link);
    const data = await response.text();
    // console.log('callAPI ln9: ',data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// async function fetchJSFile(url: string) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const jsContent = await response.text(); // Retorna o conteúdo como string
//     return jsContent;
//   } catch (error) {
//     console.error("Erro ao buscar o arquivo JS:", error);
//     return null;
//   }
// }

export function testeF(moduleName = "cliente") {
  callJS().then((resolve) => {
    try {
      let stringArray = resolve;
      // console.log(resolve)
      if (stringArray) {
        // console.log(stringArray)
        let funcNames: string[] = [];
        let varNames: string[] = [];

        let funcArray: [string, string[], string][] = [];
        let varArray: [string, string][] = [];

        function varDisect(declaration: any) {
          if (
            declaration.declarations[0].init.type !== "ArrowFunctionExpression"
          ) {
            varNames.push(declaration.declarations[0].id.name);
            varArray.push([
              declaration.declarations[0].id.name,
              declaration.declarations[0].init.value,
            ]);
          } else {
            declaration.declarations[0].init.id =
              declaration.declarations[0].id;
            funcDisect(declaration.declarations[0].init);
          }
        }

        function funcDisect(declaration: any) {
          if(stringArray){
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

        const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
        stringArray = stringArray.replace(commentRegex, "");

        // let acorn = require("acorn");
        const test = acorn.parse(stringArray, {ecmaVersion: "latest"});
        const x = test.body;
        const stringArray2 = [];

        for (let i = 0; i < x.length; i++) {
          switch (x[i].type) {
            case "VariableDeclaration":
              varDisect(x[i]);
              break;
            case "FunctionDeclaration":
              funcDisect(x[i]);
              break;
          }

          const stringDec = stringArray.slice(x[i].start, x[i].end);
          stringArray2.push(stringDec);
        }

        funcArray.forEach((functionCode) => {
          funcNames.forEach((fnName) => {
            const regex = new RegExp(`\\b${fnName}\\((.*?)\\)`, "g");
            if (functionCode[2].match(regex)) {
              functionCode[2] = functionCode[2].replace(
                regex,
                `appJson.modules.${moduleName}.functions.${fnName}($1, appJson)`
              );
            }
          });
          varNames.forEach((varName) => {
            const regex = new RegExp(`\\b${varName}\\((.*?)\\)`, "g");
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

        console.log(varNames, funcNames);
        console.log(varArray, funcArray);
      }
    } catch (e) {
      console.error("catch e:", e);
    }
  });
}
