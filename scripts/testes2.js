const teste = "pessoa";
const appClasses = {}

function addClass(className, classe){
  appClasses[className] = classe;
}
const func = new Function("className","addClass", `

  const pessoa = class {
    constructor(name) {
      this.name = name;
    }
    consoleLog() {
      return "teste classe funcionou";
    }
  };

  addClass(className, pessoa)
`);

func(teste, addClass)

console.log(appClasses)

const pessoa = new appClasses[teste]("Felipe");
console.log(pessoa.name);
console.log(pessoa.consoleLog());