export const modulesParamV2 = {
  console: {
    isVisible: false,
    log: ``,
  },
  classString: [
    `.button {
    width: 250;
    backgroundColor: #007aff;
    padding: 10;
    borderRadius: 5;
    marginTop: 10;
    justifyContent: center;
    alignItems: center;
    textAlign: center;
    color: #ffffff;
    fontSize: 20;
    fontWeight: bold;
  }
        .yellow {
    backgroundColor: #ffd900;
  }
        .blue {
    backgroundColor: #0040ff;
  }
          .red {
    backgroundColor: #ce0000;
  }
    .input {
    fontSize: 20;
    height: 30;
    backgroundColor: #ffffff;
    color: #000000;
    width: 250;
  }
    .textStyle {
    color: white;
    fontWeight: bold;
    textAlign: center;
    fontSize: 20;
  }
    .tinyLogo {
    width: 100;
    height: 100;
  }
      .containerView {
    flex: 1;
    paddingTop: 25;
    backgroundColor: black;
  }

  .navBar {
  backgroundcolor: red;
  }

  .navBarText {
  color: white;
  }
`,
  ],
  modules: {
    cliente: {
      stringFunctions: [
        `
        let contador = 0;

function timeOutTeste() {
  if(contador < 120){
    contador++;
    appJson.setField({cliente:{pageTeste:{botao2:{value:contador}}}});
    console.log(contador);
    setTimeout(() => timeOutTeste(), 1000);
  }
}


  function testeteste(param) {
  console.log(param);
  console.log(appJson);
  };
  `,
      ],
      moduleName: "Clientes",
      moduleSettings: {
        navBar: { classCss: "navBar" },
        navBarText: { classCss: "navBarText" },
      },
      pages: {
        pageTeste: {
          pageName: "Page Teste",
          pageSettings: { mainView: { class: "containerView" } },
          components: {
            sound2: {
              inputType: "sound",
              isEditable: true,
              isRequired: false,
              value: "",
              class: "button red",
              source:
                "https://www.myinstants.com/media/sounds/eu-finjo-que-nao-percebo-mas-tudo-esta-sendo-obs.mp3",
            },
            input1: {
              label: "input 1",
              inputType: "input",
              isEditable: false,
              isRequired: true,
              value: "",
              class: "input",
            },
            botao1: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 1",
              class: "button",
              function: `contador = 0
timeOutTeste();`,
            },
            botao2: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 2",
              class: "button",
              function: `testeteste("teste ok")`,
            },
            botao3: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 3",
              class: "button",
              function: `appJson.setClassCss(["cliente.pageTeste.botao1", "cliente.pageTeste.botao2", "cliente.pageTeste.botao3"],"button")`,
            },
            botao4: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 4",
              class: "button",
              function: `console.log(appJson.getClassCss(["cliente.pageTeste.botao1", "cliente.pageTeste.botao2", "cliente.pageTeste.botao3"]))`,
            },
          },
        },
        pageButton: {
          pageName: "Botão Teste",
          components: {
            botao: {
              inputType: "button",
              isEditable: true,
              isRequired: true,
              value: "Botão Teste",
            },
            razaosocial: {
              label: "Razão Social",
              inputType: "textBox",
              inputMode: "text",
              value: "",
              maxLength: 60,
              isRequired: false,
              isEditable: true,
            },
          },
        },
      },
    },
    pedido: {
      moduleName: "Pedidos",
      pages: {
        cadastro: {
          pageName: "Cadastro de Pedido",
          components: {
            numero: {
              label: "Número do pedido",
              inputType: "input",
              isEditable: true,
              isRequired: false,
              value: "",
              maxLength: 6,
              inputMode: "numeric",
              isNumber: true,
            },
            item: {
              label: "Produto",
              inputType: "input",
              isEditable: true,
              isRequired: false,
              value: "",
              maxLength: 30,
              inputMode: "text",
            },
            quantidade: {
              label: "Quantidade",
              inputType: "input",
              isEditable: true,
              isRequired: false,
              value: "",
              maxLength: 6,
              inputMode: "numeric",
              isNumber: true,
            },
            table: {
              value: "",
              inputType: "table",
              isRequired: false,
              isEditable: false,
              table: {
                dataTable: [
                  { item: "Queijo", numero: "1", quantidade: "200" },
                  { item: "Pão", numero: "2", quantidade: "6" },
                  { item: "Presunto", numero: "3", quantidade: "150" },
                  { item: "Refrigerante", numero: "4", quantidade: "2" },
                  { item: "Peito de Peru", numero: "5", quantidade: "150" },
                ],
                dataOrigin: [
                  { item: "Queijo", numero: "1", quantidade: "200" },
                  { item: "Pão", numero: "2", quantidade: "6" },
                  { item: "Presunto", numero: "3", quantidade: "150" },
                  { item: "Refrigerante", numero: "4", quantidade: "2" },
                  { item: "Peito de Peru", numero: "5", quantidade: "150" },
                ],
                tableSettings: { hasSearchBar: false },
                tableParam: {
                  numero: {
                    label: "Número do pedido",
                    inputType: "input",
                    value: "",
                    maxLength: 6,
                    inputMode: "numeric",
                    isNumber: true,
                    isVisible: true,
                    tableWidth: 100,
                  },
                  item: {
                    label: "Produto",
                    inputType: "input",
                    value: "",
                    maxLength: 30,
                    inputMode: "text",
                    isVisible: true,
                    tableWidth: 200,
                  },
                  quantidade: {
                    label: "Qtd.",
                    inputType: "input",
                    value: "",
                    maxLength: 6,
                    inputMode: "numeric",
                    isNumber: true,
                    isVisible: true,
                    tableWidth: 60,
                  },
                },
              },
            },
            botao: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Cadastrar",
              function: {
                functionCode: `console.log("primeira flag");
                console.log(appJson)
                
                if (appJson.modules.pedido.pages.cadastro.components.numero.value !== ""
                && appJson.modules.pedido.pages.cadastro.components.item.value !== ""
                && appJson.modules.pedido.pages.cadastro.components.quantidade.value !== "") {
                  
                const newRow = [{
              numero: appJson.modules.pedido.pages.cadastro.components.numero.value,
              item: appJson.modules.pedido.pages.cadastro.components.item.value,
              quantidade: appJson.modules.pedido.pages.cadastro.components.quantidade.value,
              }];

                } else {
              Alert.alert("Preencha todos os campos");
            return;   
              }
                
              
              console.log("segunda flag");
              
              setAppJson((prevForm) => ({
              ...prevForm,
              modules: {
              ...prevForm.modules,
              pedido: {
              ...prevForm.modules.pedido,
              pages: {
              ...prevForm.modules.pedido.pages,
              cadastro: {
              ...prevForm.modules.pedido.pages.cadastro,
              components: {
              ...prevForm.modules.pedido.pages.cadastro.components,
              numero: {
              ...prevForm.modules.pedido.pages.cadastro.components.numero,
              value: "",
              },
              item: {
              ...prevForm.modules.pedido.pages.cadastro.components.item,
              value: "",
              },
              quantidade: {
              ...prevForm.modules.pedido.pages.cadastro.components.quantidade,
              value: "",
              },
              table: {
              ...prevForm.modules.pedido.pages.cadastro.components.table,
              table: {
                ...prevForm.modules.pedido.pages.cadastro.components.table.table,
                dataOrigin: [
                  ...prevForm.modules.pedido.pages.cadastro.components.table.table.dataOrigin,
                  ...newRow,
              ],
                dataTable: [
                  ...prevForm.modules.pedido.pages.cadastro.components.table.table.dataTable,
                  ...newRow,
              ],
              },
              },
              },
              },
              },
              },
              },
              }));
              
              console.log("terceira flag");
              console.log(newRow)
              console.log(appJson.modules.pedido.pages.cadastro.components.table.table.dataTable)`,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  setAppJson: { import: "setAppJson", from: "setVariable" },

                  alert: { import: "Alert", from: "react-native" },
                },
              },
            },
          },
        },
      },
    },
  },
};
