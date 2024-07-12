export async function loadFunctions(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const functions: any = {};
    for (const [key, value] of Object.entries(data)) {
      functions[key] = new Function("return " + value)();
    }
    return functions;
  } catch (error) {
    console.error("Erro ao carregar o script: ", error);
    return null;
  }
}