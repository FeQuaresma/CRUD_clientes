export function extractFunctions(code:any) {
  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
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

    // Substituir referências de funções no corpo por appFunctions.[nome da função]
    functionNames.forEach(fnName => {
      const regex = new RegExp(`\\b${fnName}\\b`, 'g');
      if (body.match(regex)) {
        body = body.replace(regex, `appFunctions.${fnName}`);
        // Se a função faz referência a outra função, adicionar "appFunctions" aos parâmetros
        if (!params.includes('appFunctions')) {
          params.push('appFunctions');
        }
      }
    });

    functionsArray.push([functionName, params, body]);
  }

  return functionsArray;
}