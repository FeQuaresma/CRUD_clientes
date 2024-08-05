const arrTest = [
  ["Carlos", "Homem", "25", "Engenheiro"],
  ["Maria", "Mulher", "30", "Advogada"],
  ["Ezequiel", "Não-Binário", "21", "Influencer"],
  ["Mariana", "Mulher", "22", "Estudante"],
  ["João", "Homem", "35", "Mecânico"],
  ["Ana", "Mulher", "28", "Designer"],
  ["Pedro", "Homem", "42", "Professor"],
  ["Laura", "Mulher", "19", "Artista"],
];

const objTest = [
  {
    nome: "Carlos",
    genero: "Homem",
    idade: "25",
    profissao: "Engenheiro",
  },
  {
    nome: "Maria",
    genero: "Mulher",
    idade: "30",
    profissao: "Advogada",
  },
  {
    nome: "Ezequiel",
    genero: "Não-Binário",
    idade: "21",
    profissao: "Influencer",
  },
  {
    nome: "Mariana",
    genero: "Mulher",
    idade: "22",
    profissao: "Estudante",
  },
  { nome: "João", genero: "Homem", idade: "35", profissao: "Mecânico" },
  { nome: "Ana", genero: "Mulher", idade: "28", profissao: "Designer" },
  {
    nome: "Pedro",
    genero: "Homem",
    idade: "42",
    profissao: "Professor",
  },
  {
    nome: "Laura",
    genero: "Mulher",
    idade: "19",
    profissao: "Artista",
  },
];

const filteredWord = "A";

// arrTest.forEach((row) => {
//   const filterdWords = row.filter((word) =>
//     word.toLowerCase().includes(filterdWord.toLowerCase())
//   );

//   if (filterdWords.length !== 0) {
// console.log(
//   `Nome: ${row[0]}, Gênero: ${row[1]}, Idade: ${row[2]}, Profissão: ${row[3]}`
// );
//   }
// });

objTest.forEach((row) => {
  let filteredRow = [];
  Object.keys(row).forEach((colkey) => {
    if (row[colkey].toLowerCase().includes(filteredWord.toLowerCase())) {
      filteredRow.push(row[colkey]);
    }
  });

  filteredRow.length > 0 && console.log(filteredRow)
});
