import { DataRow } from "../components/fields/table";

import { FunctionJson } from "../functions/executeJsonFunctions";
import { params } from "./params";

export interface Param {
  label?: string;
  inputType:
    | "input"
    | "select"
    | "multiSelect"
    | "boolean"
    | "date"
    | "file"
    | "grid"
    | "table"
    | "button"
    | "textBox";
  inputMode?: "numeric" | "text" | "tel";
  value: string | { start: string; end: string };
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string | { start: string; end: string };
  maxLength?: number;
  options?: { label: string; value: string }[];
  customInputCSS?: object;
  isNumber?: boolean;
  zeroTrim?: boolean;
  isCurrency?: boolean;
}

export interface pageParam extends Param {
  isRequired: boolean;
  isEditable: boolean;
  isLocked?: boolean;
  function?: any;
  link?: {
    paramBeginning: string;
    paramSize: number;
    paramEnd: string;
    type: "fillform" | "errorMsg" | null;
  };
  quebraDeLinha?: boolean;
  table?: TableInterface;
  errorMsg?: string;
}

export interface TableInterface {
  dataTable?: DataRow[];
  dataOrigin?: DataRow[];
  tableSettings: {
    title?: string;
    tableCss?: {};
    tableSort?: string;
    tableURL?: string;
    hasSearchBar: boolean;
  };
  tableParam?: {
    [key: string]: TableParam;
  };
}

export interface TableParam extends Param {
  customHeaderCSS?: object;
  customCellCSS?: object;
  customFooterCSS?: object;
  customColumnCSS?: object;
  customHeaderTextCSS?: object;
  customCellTextCSS?: object;
  customFooterTextCSS?: object;
  customColumnTextCSS?: object;
  tableWidth: number;
  isVisible: boolean;
  searchParam?: string[] | [RegExp, string][];
  footerLabel?: { function: "sumEntries" | "sumTotal"; value: string };
  cellMasks?: string[] | [RegExp, string, number][];
  callbackMask?: [RegExp, string];
  searchSign?: "equals" | "greater-than" | "less-than";
}

export type Module = {
  variables?: any;
  stringFunctions?: string[];
  functions?: any;
  moduleName: string;
  moduleSettings?: { CSS: {} };
  pages: {
    [key: string]: {
      pageName: string;
      pageSettings?: { CSS: {} };
      components: { [key: string]: pageParam };
    };
  };
};

export type AppFunctions = { functionCode: string; functionParams: string[] };

export type ModuleParam = {
  globalSettings?: { CSS?: {} };
  modules: { [key: string]: Module };
  [key: string]: any;
};

export const modulesParamV2: ModuleParam = {
  modules: {
    cliente: {
      stringFunctions: [
        `
      
        /* Função para validarCPF ou validar CPNJ */
      
        function validateCPF(cpf) {
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
            secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
            if (String(firstDigit) != cpf[9] || String(secondDigit) != cpf[10]) {
              return false;
            } else {
              return true;
            }
          }
        }
      
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
        `,
        `
        function funcTeste(value) {
        console.log(value)
        }
        `,
        `https://caae.org.br/teste/functions.js?03x1`,
      ],
      moduleName: "Clientes",
      pages: {
        pageTeste: {
          pageName: "Page Teste",
          components: {
            botao1: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 1",
              function: `appJson.alert("Teste222");funcTeste("TesteJSONJS")`,
            },
            botao2: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 2",
              function: {
                functionCode: `console.log("flag1");global.teste = () => {console.log("global flag")}`,
                importedFunc: {},
              },
            },
            botao3: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão 3",
              function: {
                functionCode: `teste()`,
                importedFunc: {},
              },
            },
          },
        },
        cadastro: {
          pageName: "Cadastro",
          components: {
            // table: params.table,
            botao2: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão Y",
              function: {
                functionCode: `
                enter8.contador += 1
                console.log(enter8.contador)
                const variables = enter8.getAllValues(appJson, location);
                
if (variables.cep !== "") {
  enter8.alert("Cep Preenchido", variables.cep);
  const link = {
    paramBeginning: "https://viacep.com.br/ws/",
    paramEnd: "/json/",
  };

enter8.callAPI(link, variables.cep).then((resolve)=>{

enter8.fillForm(appJson, setAppJson, resolve, location)

});

} else {
  enter8.alert("CEP Não Preenchido");
}`,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  setAppJson: { import: "setAppJson", from: "setVariable" },
                  location: { import: "location", from: "location" },
                  allFunctions: { import: "enter8", from: "enter8" },
                },
              },
            },
            botaoCPF: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão CPF",
              function: {
                functionCode: `
                const variables = enter8.getAllValues(appJson, location);
                
                if(appFunctions.validateCPF(variables.cnpjcpf)){
                console.log("Deu certo")}else{console.log("Deu errado")}`,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  allFunctions: { import: "enter8", from: "enter8" },
                  location: { import: "location", from: "location" },
                  appFunctions: {
                    import: "appFunctions",
                    from: "appFunctions",
                  },
                },
              },
            },
            cnpjcpf: params.cnpjcpf,
            idestrageiro: params.idestrageiro,
            suframa: params.suframa,
            insc: params.insc,
            contribuinteicms: params.contribuinteicms,
            nomefantasia: params.nomefantasia,
            consumidorfinal: params.consumidorfinal,
            razaosocial: params.razaosocial,
            cep: params.cep,
            logradouro: params.endereconome,
            endereconumero: params.endereconumero,
            complemento: params.enderecocomplemento,
            bairro: params.enderecobairro,
            uf: params.enderecoestado,
            localidade: params.enderecocidade,
            enderecopais: params.enderecopais,
            contatonome: params.contatonome,
            contatotelefone: params.contatotelefone,
            contatotelefone2: params.contatotelefone2,
            contatoemail: params.contatoemail,

            botaoX: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão Y",
              function: {
                functionCode: `
                Alert.alertz("Y")
                `,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  appJsonx: { import: "appJson", from: "location" },
                  alert: { import: "Alert", from: "react-native" },
                },
              },
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
