const stringArray = 
  `

  /* Função para validarCPF ou validar CPNJ */

  let teste = 1

  const testeX= (x) => {console.log(x)}

  /* function validateCPF(cpf) {
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
  } */

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
  `

 export function testeF(){
    let acorn = require("acorn");
    const test = acorn.parse(stringArray, {ecmaVersion: 2020});
    const x = test.body
    const stringArray2 = []
    for (let i = 0; i < x.length; i++) {
      switch(x[i].type) {
        case "VariableDeclaration":
          varDisect();
          break; 
        case "FunctionDeclaration":
          funcDisect();
          break; 
      }      
      console.log(Object.keys(x[i].type))
      const stringDec = stringArray.slice(x[i].start,x[i].end)
      stringArray2.push(stringDec)
    }
    // console.log(stringArray2)
  }

  function varDisect(){

  }

  function funcDisect(){

  }