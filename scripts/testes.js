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

const filterdWord = "A";

arrTest.forEach((row) => {
  const filterdWords = row.filter((word) => word.toLowerCase().includes(filterdWord.toLowerCase()))


  if(filterdWords.length !== 0) {
    console.log(
      `Nome: ${row[0]}, Sexo: ${row[1]}, Idade: ${row[2]}, Profissão: ${row[3]}`
    );
  }
});
