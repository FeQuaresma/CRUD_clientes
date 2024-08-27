import { Param, params } from "./params";

export interface TableParam {
  label: string;
  inputType: string;
  inputMode?: string;
  value: string | { start: string; end: string };
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string | { start: string; end: string };
  maxLength?: number;
  customCSS?: object;
  options?: { label: string; value: string }[];
  tableWidth: number;
  isVisible: boolean;
  isNumber?: boolean;
  searchParam?: string[] | [RegExp, string][];
  isCurrency?: boolean;
  footerLabel?: { function: "sumEntries" | "sumTotal"; value: string };
  cellMasks?: string[] | [RegExp, string, number][];
  callbackMask?: [RegExp, string];
  zeroTrim?: boolean;
  searchSign?: "equals" | "greater-than" | "less-than";
}

export type ModuleParam = {
  [key: string]: {
    moduleName: string;
    formParam: Param;
    tableParam?: {
      [key: string]: TableParam;
    };
  };
};

export const modulesParam: ModuleParam = {
  cliente: {
    moduleName: "Cliente",
    formParam: {
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
    tableParam: {
      numero: {
        label: "Número",
        inputType: "input",
        inputMode: "numeric",
        value: "",
        valueMasked: "",
        maxLength: 18,
        tableWidth: 10 * 8,
        isVisible: true,
        isNumber: true,
      },
      fantasia: {
        label: "Nome Fantasia",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 18 * 8,
        isVisible: true,
      },
      razaosocial: {
        label: "Razão Social",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 30 * 8,
        isVisible: true,
      },
      endereco: {
        label: "Endereço",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 20 * 8,
        isVisible: true,
      },
      bairro: {
        label: "Bairro",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 18 * 8,
        isVisible: true,
      },
      cidade: {
        label: "Cidade",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 15 * 8,
        isVisible: true,
      },
      estado: {
        label: "Estado",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 9 * 8,
        isVisible: true,
      },
      telefone: {
        label: "Telefone",
        inputType: "input",
        inputMode: "tel",
        placeholder: "00.00000-0000",
        masks: [
          [/^(\d{2})(\d{1,5})(\d{1,4})$/, "$1.$2-$3", 11],
          [/^(\d{0,2})(\d{0,4})(\d{0,4})$/, "$1.$2-$3", 1],
        ],
        customCSS: { width: 160 },
        value: "",
        valueMasked: "",
        maxLength: 13,
        tableWidth: 16 * 8,
        isVisible: true,
        isNumber: true,
      },
      fax: {
        label: "Telefone 2",
        inputType: "input",
        inputMode: "tel",
        placeholder: "00.00000-0000",
        masks: [
          [/^(\d{2})(\d{1,5})(\d{1,4})$/, "$1.$2-$3", 11],
          [/^(\d{0,2})(\d{0,4})(\d{0,4})$/, "$1.$2-$3", 1],
        ],
        customCSS: { width: 160 },
        value: "",
        valueMasked: "",
        maxLength: 13,
        tableWidth: 15 * 8,
        isVisible: false,
        isNumber: true,
      },
      contato: {
        label: "Contato",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 18 * 8,
        isVisible: true,
      },
      email: {
        label: "E-mail",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 23 * 8,
        isVisible: true,
      },
      tipo: {
        label: "Tipo",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 9 * 8,
        isVisible: true,
      },
    },
  },
  transportadora: {
    moduleName: "Transportadora",
    formParam: {
      cnpjcpf: params.cnpjcpf,
      insc: params.insc,
      nomefantasia: params.nomefantasia,
      razaosocial: params.razaosocial,
      cep: params.cep,
      endereco: params.endereco,
      endereconome: params.endereconome,
      endereconumero: params.endereconumero,
      enderecocomplemento: params.enderecocomplemento,
      enderecobairro: params.enderecobairro,
      enderecoestado: params.enderecoestado,
      enderecocidade: params.enderecocidade,
      contatonome: params.contatonome,
      contatotelefone: params.contatotelefone,
      contatotelefone2: params.contatotelefone2,
      contatoemail: params.contatoemail,
      placaveiculo: params.placaveiculo,
      enderecouf: params.enderecouf,
      rntc: params.rntc,
      modalidadefrete: params.modalidadefrete,
      obeservacoes: params.observacoes,
    },
  },
  pedido: {
    moduleName: "Pedido",
    formParam: {
      cliente: params.clienteProduto,
      produto: params.produto,
      quantidade: params.quantidadeProduto,
      precouni: params.precoProduto,
      desconto: params.descontoProduto,
      precototal: params.precoTotalProduto,
      descricao: params.descricaoProduto,
      contatoemail: params.contatoemail,
      contatotelefone: params.contatotelefone,
      cnpjcpf: params.cnpjcpf,
    },
    tableParam: {
      numero: {
        label: "Pedido",
        inputType: "input",
        inputMode: "numeric",
        value: "",
        valueMasked: "",
        tableWidth: 10 * 8,
        isVisible: true,
        isNumber: true,
        footerLabel: { function: "sumEntries", value: "" },
      },
      notafiscal: {
        label: "Nota Fiscal",
        inputType: "input",
        inputMode: "numeric",
        value: "",
        valueMasked: "",
        tableWidth: 10 * 8,
        isVisible: true,
        isNumber: true,
      },
      data: {
        label: "Data",
        inputType: "date",
        inputMode: "numeric",
        maxLength: 10,
        value: { start: "", end: "" },
        valueMasked: { start: "", end: "" },
        placeholder: "DD/MM/AAAA",
        customCSS: { width: 220 },
        cellMasks: [[/^(\d{0,4})(\d{0,2})(\d{0,2})$/, "$3/$2/$1", 8]],
        masks: [[/^(\d{0,2})(\d{0,2})(\d{0,4})$/, "$1/$2/$3", 1]],
        searchParam: [[/^(\d{4})(\d{2})(\d{2})$/, "$3-$2-$1"]],
        callbackMask: [/^(\d{4})(\d{2})(\d{2})$/, "$3$2$1"],
        tableWidth: 14 * 8,
        isVisible: true,
        isNumber: true,
      },
      cliente: {
        label: "Cliente",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 23 * 8,
        isVisible: true,
      },
      total: {
        label: "Valor",
        inputType: "input",
        inputMode: "numeric",
        masks: [
          [/(\d+)(\d{3})(\d{3})(\d{2})$/, "R$ $1.$2.$3,$4", 9],
          [/(\d+)(\d{3})(\d{2})$/, "R$ $1.$2,$3", 6],
          [/(\d+)(\d{2})$/, "R$ $1,$2", 3],
          [/(\d+)$/, "R$ 0,$1", 2],
          [/(\d+)$/, "R$ 0,0$1", 1],
        ],
        value: "",
        valueMasked: "",
        tableWidth: 18 * 8,
        isVisible: true,
        isNumber: true,
        isCurrency: true,
        footerLabel: { function: "sumTotal", value: "" },
        zeroTrim: true,
        customCSS: { width: 220 },
        searchSign: "equals"
      },
      formapagamento: {
        label: "Forma Pagamento",
        inputType: "input",
        inputMode: "text",
        value: "",
        valueMasked: "",
        tableWidth: 18 * 8,
        isVisible: true,
      },
      // vencimento: {
      //   label: "Vencimento",
      //   inputType: "input",
      //   inputMode: "numeric",
      //   value: "",
      //   valueMasked: "",
      //   tableWidth: 10 * 8,
      //   isVisible: false,
      //   isNumber: true,
      // },
      // usuario: {
      //   label: "Usuário",
      //   inputType: "input",
      //   inputMode: "numeric",
      //   value: "",
      //   valueMasked: "",
      //   tableWidth: 10 * 8,
      //   isVisible: false,
      // },
      // statusenter8: {
      //   label: "Status enter8",
      //   inputType: "input",
      //   inputMode: "numeric",
      //   value: "",
      //   valueMasked: "",
      //   tableWidth: 10 * 8,
      //   isVisible: false,
      // },
    },
  },
};
