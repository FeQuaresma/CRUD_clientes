
import { Param, params } from "./params";

export type ModuleParam = {
  [key: string]: {
    moduleName: string;
    formParam: Param;
    data?: any[][]
  }
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
  }, pedido: {
    moduleName: "Pedido",
    formParam: {
      cliente: params.clienteProduto,
      produto: params.produto,
      quantidade: params.quantidadeProduto,
      precouni: params.precoProduto,
      desconto: params.descontoProduto,
      precototal: params.precoTotalProduto,
    },
    data: [
      ["Casa São Pedro", "Calça Jeans", 10, 69.99, 5, 664.90],
      ["Moda & Cia", "Camiseta", 5, 29.99, 10, 134.95],
      ["Fashion Store", "Jaqueta", 2, 199.99, 15, 339.98],
      ["Estilo Único", "Vestido", 3, 89.99, 20, 215.98],
      ["Roupas da Hora", "Blusa", 7, 39.99, 10, 251.93],
      ["Fashion Store", "Saia", 4, 49.99, 5, 189.96],
      ["Casa São Pedro", "Casaco", 1, 249.99, 10, 224.99],
      ["Estilo Único", "Bermuda", 8, 59.99, 20, 383.92],
      ["Moda & Cia", "Camiseta Polo", 6, 79.99, 5, 455.94],
      ["Roupas da Hora", "Regata", 10, 19.99, 10, 179.91],
      ["Casa São Pedro", "Calça Social", 3, 99.99, 15, 254.97],
      ["Fashion Store", "Jaqueta Jeans", 5, 129.99, 20, 519.96],
      ["Estilo Único", "Blazer", 2, 149.99, 10, 269.98],
      ["Moda & Cia", "Short", 8, 34.99, 5, 265.92],
      ["Roupas da Hora", "Macacão", 1, 119.99, 10, 107.99],
      ["Fashion Store", "Camisa", 4, 54.99, 5, 208.96],
      ["Casa São Pedro", "Legging", 6, 39.99, 15, 203.95],
      ["Estilo Único", "Sobretudo", 2, 179.99, 10, 323.98],
      ["Moda & Cia", "Terno", 1, 299.99, 20, 239.99],
      ["Roupas da Hora", "Cardigan", 3, 69.99, 5, 199.97],
      ["Casa São Pedro", "Moletom", 7, 59.99, 10, 377.93],
      ["Fashion Store", "Calça Legging", 10, 49.99, 15, 424.91],
      ["Estilo Único", "Vestido Longo", 2, 109.99, 5, 209.98],
      ["Moda & Cia", "Camiseta", 5, 29.99, 10, 134.95],
      ["Roupas da Hora", "Top", 8, 19.99, 5, 151.92],
      ["Fashion Store", "Casaco", 3, 89.99, 10, 242.97],
      ["Casa São Pedro", "Saia Jeans", 4, 44.99, 20, 143.97],
      ["Estilo Único", "Blusa", 7, 39.99, 5, 265.92],
      ["Moda & Cia", "Bermuda", 6, 49.99, 10, 269.94],
      ["Roupas da Hora", "Calça Jeans", 2, 69.99, 15, 118.98]
  ]
  },   
  
};

