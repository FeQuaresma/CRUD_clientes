const arrayTeste = ["contador", "teste", "teste2"]
let stringTeste = "console.log(contador)"

arrayTeste.forEach((varName) => {
  const regex = new RegExp(`\\b${varName}\\b`, "g");
  if (stringTeste.match(regex)) {
    stringTeste = stringTeste.replace(
      regex,
      `appJson.modules.variables.${varName}`
    );
  }
});

console.log(stringTeste)