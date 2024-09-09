import { FunctionJson } from "../functions/executeJsonFunctions";
import { FormParam, params } from "./params";

export interface Param {
  label?: string;
  inputType: string;
  inputMode?: string;
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
  tableSettings: {
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
            table: params.table,
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
  },
};
