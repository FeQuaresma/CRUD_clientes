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
  function?: FunctionJson;
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

export type ModuleParam = {
  globalSettings?: { CSS?: {} };
  modules: { [key: string]: Module };
};

export const modulesParamV2: ModuleParam = {
  modules: {
    cliente: {
      moduleName: "Clientes",
      pages: {
        cadastro: {
          pageName: "Cadastro",
          components: {
            // table: params.table,
            botao: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão X",
              function: {
                functionCode: `
                enter8.contador += 1
                console.log(enter8.contador)
                const test = enter8.getAllValues(appJson, location);
                
if (test.cep !== "") {
  enter8.alert("Cep Preenchido", test.cep);
  const link = {
    paramBeginning: "https://viacep.com.br/ws/",
    paramEnd: "/json/",
  };

enter8.callAPI(link, test.cep).then((resolve)=>{

console.log(resolve)

});

} else {
  enter8.alert("CEP Não Preenchido");
}`,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  location: { import: "location", from: "location" },
                  allFunctions: { import: "enter8", from: "enter8" },
                },
              },
            },
            botao2: {
              inputType: "button",
              isEditable: false,
              isRequired: true,
              value: "Botão Y",
              function: {
                functionCode: `
                enter8.contador += 1
                console.log(enter8.contador)
                const test = enter8.getAllValues(appJson, location);
                
if (test.cep !== "") {
  enter8.alert("Cep Preenchido", test.cep);
  const link = {
    paramBeginning: "https://viacep.com.br/ws/",
    paramEnd: "/json/",
  };

enter8.callAPI(link, test.cep).then((resolve)=>{

console.log(resolve)

});

} else {
  enter8.alert("CEP Não Preenchido");
}`,
                importedFunc: {
                  appJson: { import: "appJson", from: "variable" },
                  location: { import: "location", from: "location" },
                  allFunctions: { import: "enter8", from: "enter8" },
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
            endereco: params.endereco,
            endereconome: params.endereconome,
            endereconumero: params.endereconumero,
            enderecocomplemento: params.enderecocomplemento,
            enderecobairro: params.enderecobairro,
            enderecoestado: params.enderecoestado,
            enderecocidade: params.enderecocidade,
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
