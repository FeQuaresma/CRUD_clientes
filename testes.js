// enviarDados(appJson.getValue(appJson, {module: "cliente",page: "pageCad",field: "nome"}),appJson.getValue(appJson, {module: "cliente",page: "pageCad",field: "valor"}), appJson.getValue(appJson, {module: "cliente",page: "pageCad",field: "id"}));receberDados();

// function enviarDados(nome, valor, id) {

//   fetch("https://www.caae.org.br/backend/enviar_dados.php", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       nome: nome,
//       valor: valor
//     })
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.mensagem);
//   })
//   .catch((error) => console.error("Erro ao enviar dados:", error));

// }

// appJson.setField({cliente:{pageCad:{nome:{value:""},valor:{value:""},id:{value:""}}}});

let id = 1

console(typeof Number(id))