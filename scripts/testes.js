function extractFunctions(appFunctionsArray) {

  let code;
  for (let index = 0; index < appFunctionsArray.length; index++) {
    code = code + appFunctionsArray[index];
  }
  console.log(code)
  const functionRegex = / function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
  const functionsArray = [];

  // Armazena todos os nomes de funções encontradas
  const functionNames = [];

  // Primeira passagem: captura apenas os nomes das funções
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1].trim();  // Nome da função
    functionNames.push(functionName);
  }

  // Segunda passagem: extrai funções, parâmetros e corpo, e ajusta as referências
  functionRegex.lastIndex = 0;  // Resetar a posição do regex
  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1].trim();
    let params = match[2].trim().split(", ").filter(param => param);

    // Encontrar o índice de onde o corpo da função começa
    const functionBodyStart = match.index + match[0].length;

    // Encontrar o corpo completo da função usando contagem de chaves
    let openBrackets = 1;
    let functionBodyEnd = functionBodyStart;
    while (openBrackets > 0 && functionBodyEnd < code.length) {
      const char = code[functionBodyEnd];
      if (char === '{') openBrackets++;
      if (char === '}') openBrackets--;
      functionBodyEnd++;
    }

    let body = code.slice(functionBodyStart, functionBodyEnd - 1).trim();

    functionsArray.push([functionName, params, body]);
  }

      // Substituir referências de funções no corpo por appFunctions.[nome da função]

      functionsArray.forEach((functionCode) => {

        functionNames.forEach(fnName => {
          const regex = new RegExp(`\\b${fnName}\\b`, 'g');
          if (functionCode[2].match(regex)) {
            functionCode[2] = functionCode[2].replace(regex, `appFunctions.${fnName}`);
            // Se a função faz referência a outra função, adicionar "appFunctions" aos parâmetros
            if (!functionCode[1].includes('appFunctions')) {
              functionCode[1].push('appFunctions');
            }
          }
        });


      })

  return functionsArray;
}


const appFunctions = [
  `

  /* Função para validarCPF ou validar CPNJ */

      function validateDocumento(cpf) {
    if (cpf.length === 11) return validateCPF(cpf);
    else if (cpf.length === 14) return validateCNPJ(cnpj);
    else return false;
  }

  /*function validateDocumentov2(cpf) {
    if (cpf.length === 11) return validateCPF(cpf);
    else if (cpf.length === 14) return validateCNPJ(cnpj);
    else return false;
  }*/

  function validateCPF(cpf) {
    if (cpf.length != 11) {
      return false;
    } else {
      let appFun.firstDigit = 0;
      let secondDigit = 0;
      for (let i = 0; i < 10; i++) {
        i < 9 ? (firstDigit += Number(cpf[i]) * (i + 1)) : null;
        secondDigit += Number(cpf[i]) * i;
      }
      firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
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


  `,
  `
  function funcTeste(value) {
  console.log(value)
  }
  `,
]

console.log(extractFunctions(appFunctions));






function x(getvalues){
  getvalues()
}