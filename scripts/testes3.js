const stringArray = [
  `

  /* Função para validarCPF ou validar CPNJ */

  var teste = 1

  function validateCPF(cpf) {
    if (cpf.length != 11) {
      return false;
    } else {
      let firstDigit = 0;
      let secondDigit = 0;
      for (let i = 0; i < 10; i++) {
        i < 9 ? (firstDigit += Number(cpf[i]) * (i + 1)) : null;
        secondDigit += Number(cpf[i]) * i;
      }
      firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
      // comentario
      secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
      if (String(firstDigit) != cpf[9] || String(secondDigit) != cpf[10]) {
        return false;
      } else {
        return true;
      }
    }
  }

  function validateCNPJ(cnpj) {
     if (cnpj.length != 11) {
      return false;
    } else {
      let firstDigit = 0;
      let secondDigit = 0;
      for (let i = 0; i < 10; i++) {
        i < 9 ? (firstDigit += Number(cnpj[i]) * (i + 1)) : null;
        secondDigit += Number(cnpj[i]) * i;
      }
      firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
      secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
      if (String(firstDigit) != cnpj[9] || String(secondDigit) != cnpj[10]) {
        return false;
      } else {
        return true;
      }
    }
  }

  function validateDocumento(cpf) {
    if (cpf.length === 11) return validateCPF(cpf);
    else if (cpf.length === 14) return validateCNPJ(cnpj);
    else return false;
  }
  `,
  `
  function funcTeste(value) {
  console.log(value)
  }
  `,
];

function extractFunctions(appFunctionsArray, moduleName) {
  let code = "";

  for (let index = 0; index < appFunctionsArray.length; index++) {
    code = code + appFunctionsArray[index];
  }

  const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
  code = code.replace(commentRegex, "");

  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
  const variableRegex = /(var|let|const)\s+([a-zA-Z0-9_]+)\s*=\s*(.+)/;
  const testRegex = /(var|let|const|function)\s+([a-zA-Z0-9_]+)\s*=\s*(.+)/;

  // Armazena todos os nomes de funções encontradas
  const functionsNames = [];
  const functionsArray = [];

  const variablesNames = [];
  const variablesArray = [];

  // Primeira passagem: captura apenas os nomes das funções
  let match;

  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1].trim(); // Nome da função
    functionsNames.push(functionName);
    console.log(match);
  }
}

extractFunctions(stringArray, "cliente");

// if (appJson.modules.cliente.variables) {
//   Object.keys(appJson.modules.cliente.variables).forEach((varName: any) => {
//     const regex = new RegExp(`\\b${varName}\\b`, "g");
//     if (funcString.match(regex)) {
//       funcString = funcString.replace(
//         regex,
//         `appJson.modules.${moduleName}.variables.${varName}`
//       );
//     }
//   });
// }
