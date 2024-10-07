const testeObj = {
  modulo: {
    pagina: {
      campo: { valor: "tal", css: "teste" },
      campo2: { valor: "tal", css: "teste" },
      campo3: { valor: "tal", css: "teste" },
    },
    pagina2: {},
  },
  modulo2: {},
  modulo3: {
    pagina: {
      campo: { valor: "tal", css: "teste" },
      campo2: { valor: "tal", css: "teste" },
      campo3: { valor: "tal", css: "teste" },
    },
    pagina2: {
      campo: { valor: "tal", css: "teste" },
      campo2: { valor: "tal", css: "teste" },
      campo3: { valor: "tal", css: "teste" },
    },
  },
};

let modAlt= 0;
let pagAlt= 0;
let fldAlt= 0;



console.log(Object.keys(testeObj).length)