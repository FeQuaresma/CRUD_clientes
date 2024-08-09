import { Param, params } from "./params";

export interface TableParam {
  label?: string;
  inputType: string;
  inputMode?: string;
  value: string;
  placeholder?: string;
  masks?: string[];
  valueMasked?: string;
  maxLength?: number;
  customCSS?: object;
  options?: { label: string; value: string }[];
  tableWidth: number;
  isVisible: boolean;
}

export type ModuleParam = {
  [key: string]: {
    moduleName: string;
    formParam: Param;
    tableParam?: {
      [key: string]: TableParam
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
        placeholder: "CPF ou CNPJ",
        masks: ["###.###.###-##", "##.###.###/####-##"],
        valueMasked: "",
        maxLength: 18,
        tableWidth: 9 * 8,
        isVisible: false,
      },
      fantasia: {
        label: "Nome Fantasia",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,        
        tableWidth: 18 * 8 ,
        isVisible: true,
      },
      razaosocial: {
        label: "Razão Social",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,        
        tableWidth: 30 * 8 ,
        isVisible: true,
      },
      endereco: {
        label: "Endereço",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 20 * 8 ,
        isVisible: true,
      },
      bairro: {
        label: "Bairro",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 18 * 8 ,
        isVisible: true,
      },
      cidade: {
        label: "Cidade",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 15 * 8 ,
        isVisible: true,
      },
      estado: {
        label: "Estado",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 9 * 8 ,
        isVisible: true,
      },
      telefone: {
        label: "Telefone",
        inputType: "input",
        inputMode: "tel",
        placeholder: "(00) 00000-0000",
        masks: ["(##) ####-####", "(##) #####-####"],
        customCSS: {width: 160},
        value: "",
        valueMasked: "",
        maxLength: 15,
        tableWidth: 15 * 8 ,
        isVisible: true,
      },
      fax: {
        label: "Telefone 2",
        inputType: "input",
        inputMode: "tel",
        placeholder: "(00) 00000-0000",
        masks: ["(##) ####-####", "(##) #####-####"],
        
        customCSS: {width: 160},
        value: "",
        valueMasked: "",
        maxLength: 15,
        tableWidth: 15 * 8 ,
        isVisible: true,
      },
      contato: {
        label: "Contato",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 18 * 8 ,
        isVisible: true,
      },
      email: {
        label: "E-mail",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 23 * 8 ,
        isVisible: true,
      },
      tipo: {
        label: "Tipo",
        inputType: "input",
        inputMode: "text",
        value: "",
        maxLength: 60,
        tableWidth: 9 * 8 ,
        isVisible: true,
      },
    }
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
    }
  },
};
