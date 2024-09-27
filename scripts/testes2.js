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


// const stringArray = [
//   `
//   texto teste

// var teste = 1

// algo nada a ver

// var teste2 = 2

// terceiro teste
//   `
// ];
function extractFunctions(appFunctionsArray, moduleName) {
  let code = "";

  for (let index = 0; index < appFunctionsArray.length; index++) {
    code = code + appFunctionsArray[index];
  }

  const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
  code = code.replace(commentRegex, '');




  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
  const variableRegex = /(var|let|const)\s+([a-zA-Z0-9_]+)\s*=\s*(.+)/;

  // Armazena todos os nomes de funções encontradas
  const functionsNames = [];
  const functionsArray = [];

  const variablesNames = []
  const variablesArray = [];


  // Primeira passagem: captura apenas os nomes das funções
  let match;
  variableRegex.lastIndex = 0; // Resetar a posição do regex



  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1].trim(); // Nome da função
    functionsNames.push(functionName);
  }

  // Segunda passagem: extrai funções, parâmetros e corpo, e ajusta as referências
  functionRegex.lastIndex = 0; // Resetar a posição do regex
  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1].trim();
    let params = match[2]
      .trim()
      .split(", ")
      .filter((param) => param);

    // Encontrar o índice de onde o corpo da função começa
    const functionBodyStart = match.index + match[0].length;

    // Encontrar o corpo completo da função usando contagem de chaves
    let openBrackets = 1;
    let functionBodyEnd = functionBodyStart;
    while (openBrackets > 0 && functionBodyEnd < code.length) {
      const char = code[functionBodyEnd];
      if (char === "{") openBrackets++;
      if (char === "}") openBrackets--;
      functionBodyEnd++;
    }

    let body = code.slice(functionBodyStart, functionBodyEnd - 1).trim();

    functionsArray.push([functionName, params, body]);
    code = code.slice(0,match.index) + code.slice(functionBodyEnd - 1);
  }

  while ((match = variableRegex.exec(code)) !== null) {
    
    const variableName = match[2].trim(); // Nome da variável (ajuste para pegar o nome correto)
    const variableValue = match[3].trim(); // Valor da variável
    
    variablesNames.push(variableName);
    variablesArray.push([variableName, variableValue]);
  
    // Avançar o índice do regex para evitar o loop infinito
    variableRegex.lastIndex = match.index + match[0].length;

    // console.log("ln 111",code.slice(0,match.index), "mid 111",code.slice(variableRegex.lastIndex), "end 111")
    // console.log(code.slice(variableRegex.lastIndex));
    
    code = code.slice(0,match.index) + code.slice(functionRegex.lastIndex-1);

  }


  // Substituir referências de funções no corpo por appFunctions.[nome da função]

  functionsArray.forEach((functionCode) => {
    functionsNames.forEach((fnName) => {
      const regex = new RegExp(`\\b${fnName}\\((.*?)\\)`, "g");
      if (functionCode[2].match(regex)) {
        functionCode[2] = functionCode[2].replace(
          regex,
          `appJson.modules.${moduleName}.functions.${fnName}($1, appJson)`
        );
      }
    });
    variablesNames.forEach((varName) => {
      const regex = new RegExp(`\\b${varName}\\((.*?)\\)`, "g");
      if (functionCode[2].match(regex)) {
        functionCode[2] = functionCode[2].replace(
          regex,
          `appJson.modules.${moduleName}.variables.${varName}($1, appJson)`
        );
      }
    });
    if (!functionCode[1].includes("appJson")) {
      functionCode[1].push("appJson");
    }
  });
  
  console.log(code)
  console.log(functionsArray, variablesArray)
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
