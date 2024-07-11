export async function loadFunctions(url: string, funcName?: string) {
  const response = await fetch(url);
  const data = await response.json();
  //const dataFunc = eval(data[funcName])
  return data;
}
