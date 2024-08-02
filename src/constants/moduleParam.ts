import { Param, params } from "./params";

export type ModuleParam = {
  [key: string]: {
    moduleName: string;
    formParam: Param;
    table?: {
      [key: string]: {
        label: string;
        tableWidth: number;
      };
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
    table: {
      numero: { label: "Número", tableWidth: 9 * 8 },
      fantasia: { label: "Fantasia", tableWidth: 20 * 8 },
      razaosocial: { label: "Razão Social", tableWidth: 30 * 8 },
      endereco: { label: "Endereço", tableWidth: 20 * 8 },
      bairro: { label: "Bairro", tableWidth: 15 * 8 },
      cidade: { label: "Cidade", tableWidth: 15 * 8 },
      estado: { label: "Estado", tableWidth: 10 * 8 },
      telefone: { label: "Telefone", tableWidth: 14 * 8 },
      fax: { label: "Telefone 2", tableWidth: 14 * 8 },
      contato: { label: "Contato", tableWidth: 15 * 8 },
      email: { label: "E-mail", tableWidth: 32 * 8 },
      tipo: { label: "Tipo", tableWidth: 7 * 8 },
    },
  },
};

// : {label: "", tableWidth: *8}
