import { FunctionJson } from "../functions/executeJsonFunctions";
import { pageParam, TableInterface } from "./moduleParamV2";

export interface FormParam {
  label?: string;
  inputType: string;
  inputMode?: string;
  value: string;
  placeholder?: string;
  masks?: string[];
  valueMasked?: string;
  maxLength?: number;
  isRequired: boolean;
  isEditable: boolean;
  isLocked?: boolean;
  customInputCSS?: object;
  function?: FunctionJson;
  options?: { label: string; value: string }[];
  link?: {
    paramBeginning: string;
    paramSize: number;
    paramEnd: string;
    type: "fillform" | "errorMsg" | null;
  };
  quebraDeLinha?: boolean;
  table?: TableInterface;
}

export type Param = {
  [key: string]: pageParam;
};

export const params: Param = {
  cnpjcpf: {
    label: "CNPJ/CPF",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    placeholder: "CPF ou CNPJ",
    masks: [
      [/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/, "$1.$2.$3/$4-$5", 12],
      [/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, "$1.$2.$3-$4", 1],
    ],
    valueMasked: "",
    maxLength: 18,
    isRequired: true,
    isEditable: false,
    customInputCSS: { width: 220 },
    function: {
      functionCode: `
      if(!validateCPF(appJson.modules.cliente.pages.cadastro.components.cnpjcpf.value)){
        Alert.alert('CPF inválido')
        }else{
        Alert.alert('CPF válido')
      }`,
      importedFunc: {
        a: { import: "validateCPF", from: "validateCPF" },
        b: { import: "appJson", from: "variable" },
        c: { import: "Alert", from: "react-native" },
      },
    },
    quebraDeLinha: true,
  },
  insc: {
    label: "Inscrição Estadual",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    maxLength: 17,
    isRequired: false,
    isEditable: true,
  },
  table: {
    inputType: "table",
    value: "",
    isRequired: false,
    isEditable: false,
    table: {
      tableSettings: {
        hasSearchBar: false,
        tableURL: "https://www.caae.org.br/teste/testeData.json",
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
          isVisible: false,
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
            [/^(\d{0,2})(\d{0,4})(\d{0,4})$/, "$1.$2-$3", 10],
            [/^(\d{0,5})(\d{0,4})$/, "$1-$2", 9],
            [/^(\d{0,4})(\d{0,4})$/, "$1-$2", 1],
          ],
          customInputCSS: { width: 160 },
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
            [/^(\d{0,2})(\d{0,4})(\d{0,4})$/, "$1.$2-$3", 10],
            [/^(\d{0,5})(\d{0,4})$/, "$1-$2", 9],
            [/^(\d{0,4})(\d{0,4})$/, "$1-$2", 1],
          ],
          customInputCSS: { width: 160 },
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
          isVisible: false,
        },
        email: {
          label: "E-mail",
          inputType: "input",
          inputMode: "text",
          value: "",
          maxLength: 60,
          tableWidth: 23 * 8,
          isVisible: false,
        },
        tipo: {
          label: "Tipo",
          inputType: "input",
          inputMode: "text",
          value: "",
          maxLength: 60,
          tableWidth: 9 * 8,
          isVisible: false,
        },
      },
    },
  },
  razaosocial: {
    label: "Razão Social",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: false,
    isEditable: true,
  },
  nomefantasia: {
    label: "Nome Fantasia",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: false,
  },
  idestrageiro: {
    label: "ID Estrangeiro",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    maxLength: 20,
    isRequired: false,
    isEditable: true,
  },
  suframa: {
    label: "suframa",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    maxLength: 20,
    isRequired: false,
    isEditable: true,
  },
  contribuinteicms: {
    label: "Contribuinte ICMS",
    inputType: "select",
    options: [
      { label: "Contribuinte", value: "contribuinte" },
      { label: "Isento", value: "isento" },
      { label: "Não Contribuinte", value: "nao_contribuinte" },
    ],
    value: "",
    isRequired: false,
    isEditable: true,
  },
  consumidorfinal: {
    label: "Consumidor final",
    inputType: "select",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
    ],
    value: "",
    isRequired: false,
    isEditable: true,
  },
  cep: {
    label: "CEP",
    inputType: "input",
    inputMode: "numeric",
    placeholder: "00000-000",
    masks: [[/^(\d{0,5})(\d{0,3})$/, "$1-$2", 1]],
    value: "",
    isRequired: true,
    isEditable: true,
    valueMasked: "",
    maxLength: 9,
    link: {
      paramBeginning: "https://viacep.com.br/ws/",
      paramSize: 8,
      paramEnd: "/json/",
      type: "fillform",
    },
  },
  endereco: {
    label: "Endereço",
    inputType: "select",
    options: [
      { label: "Rua", value: "rua" },
      { label: "Avenida", value: "avenida" },
      { label: "Praça", value: "praca" },
    ],
    value: "",
    isRequired: true,
    isEditable: true,
  },
  endereconome: {
    label: "Logradouro",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  endereconumero: {
    label: "Número",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 5,
    isRequired: true,
    isEditable: true,
  },
  enderecocomplemento: {
    label: "Complemento",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: false,
    isEditable: false,
  },
  enderecoestado: {
    label: "Estado",
    inputType: "select",
    options: [
      { label: "Acre", value: "acre" },
      { label: "Alagoas", value: "alagoas" },
      { label: "Amapá", value: "amapa" },
      { label: "Amazonas", value: "amazonas" },
      { label: "Bahia", value: "bahia" },
      { label: "Ceará", value: "ceara" },
      { label: "Distrito Federal", value: "distritofederal" },
      { label: "Espírito Santo", value: "espiritosanto" },
      { label: "Goiás", value: "goias" },
      { label: "Maranhão", value: "maranhao" },
      { label: "Mato Grosso", value: "matogrosso" },
      { label: "Mato Grosso do Sul", value: "matogrossodosul" },
      { label: "Minas Gerais", value: "minasgerais" },
      { label: "Pará", value: "para" },
      { label: "Paraíba", value: "paraiba" },
      { label: "Paraná", value: "parana" },
      { label: "Pernambuco", value: "pernambuco" },
      { label: "Piauí", value: "piaui" },
      { label: "Rio de Janeiro", value: "riodejaneiro" },
      { label: "Rio Grande do Norte", value: "riograndedonorte" },
      { label: "Rio Grande do Sul", value: "riograndedosul" },
      { label: "Rondônia", value: "rondonia" },
      { label: "Roraima", value: "roraima" },
      { label: "Santa Catarina", value: "santacatarina" },
      { label: "São Paulo", value: "saopaulo" },
      { label: "Sergipe", value: "sergipe" },
      { label: "Tocantins", value: "tocantins" },
    ],
    value: "",
    isRequired: true,
    isEditable: true,
  },
  enderecouf: {
    label: "Estado",
    inputType: "select",
    options: [
      { label: "AC", value: "ac" },
      { label: "AL", value: "al" },
      { label: "AP", value: "ap" },
      { label: "AM", value: "am" },
      { label: "BA", value: "ba" },
      { label: "CE", value: "ce" },
      { label: "DF", value: "df" },
      { label: "ES", value: "es" },
      { label: "GO", value: "go" },
      { label: "MA", value: "ma" },
      { label: "MT", value: "mt" },
      { label: "MS", value: "ms" },
      { label: "MG", value: "mg" },
      { label: "PA", value: "pa" },
      { label: "PB", value: "pb" },
      { label: "PR", value: "pr" },
      { label: "PE", value: "pe" },
      { label: "PI", value: "pi" },
      { label: "RJ", value: "rj" },
      { label: "RN", value: "rn" },
      { label: "RS", value: "rs" },
      { label: "RO", value: "ro" },
      { label: "RR", value: "rr" },
      { label: "SC", value: "sc" },
      { label: "SP", value: "sp" },
      { label: "SE", value: "se" },
      { label: "TO", value: "to" },
    ],
    value: "",
    isRequired: true,
    isEditable: true,
  },
  enderecocidade: {
    label: "Cidade",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  enderecobairro: {
    label: "Bairro",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  enderecopais: {
    label: "País",
    inputType: "input",
    inputMode: "text",
    value: "Brasil",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  contatotelefone: {
    label: "Telefone",
    inputType: "input",
    inputMode: "tel",
    placeholder: "(00) 00000-0000",
    masks: ["(##) ####-####", "(##) #####-####"],
    value: "",
    valueMasked: "",
    maxLength: 15,
    isRequired: true,
    isEditable: true,
  },
  contatotelefone2: {
    label: "Telefone 2",
    inputType: "input",
    inputMode: "tel",
    placeholder: "(00) 00000-0000",
    masks: ["(##) ####-####", "(##) #####-####"],
    value: "",
    valueMasked: "",
    maxLength: 15,
    isRequired: false,
    isEditable: false,
  },
  contatonome: {
    label: "Contato",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  contatoemail: {
    label: "E-mail",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
  placaveiculo: {
    label: "Placa Veículo",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 8,
    isRequired: false,
    isEditable: true,
  },
  rntc: {
    label: "RNTC",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 20,
    isRequired: false,
    isEditable: true,
  },
  modalidadefrete: {
    label: "Modalidade Frete",
    inputType: "select",
    options: [
      { label: "Destinatário (FOB)", value: "fob" },
      { label: "Remetente (CIF)", value: "cif" },
      { label: "Terceiros", value: "terceiros" },
      { label: "Próprio remetente", value: "remetente" },
      { label: "Próprio destinatário", value: "destinatario" },
      { label: "Sem ocorrência de transporte", value: "semtransporte" },
    ],
    value: "",
    isRequired: false,
    isEditable: true,
  },
  observacoes: {
    label: "Observações",
    inputType: "textBox",
    inputMode: "text",
    value: "",
    isRequired: false,
    isEditable: true,
  },
  valor: {
    label: "Valor",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    isRequired: false,
    isEditable: true,
  },
  clienteProduto: {
    label: "Cliente",
    inputType: "input",
    inputMode: "text",
    isRequired: true,
    isEditable: false,
    value: "",
    placeholder: "Digite o nome do cliente",
  },
  produto: {
    label: "Produto",
    inputType: "input",
    inputMode: "text",
    isRequired: true,
    isEditable: false,
    value: "",
    placeholder: "Digite o código do produto",
  },
  quantidadeProduto: {
    label: "Qtd.",
    inputType: "input",
    inputMode: "numeric",
    isRequired: true,
    isEditable: true,
    value: "",
  },
  precoProduto: {
    label: "Preço Unitário",
    inputType: "input",
    inputMode: "numeric",
    isRequired: true,
    isEditable: true,
    value: "",
  },

  descontoProduto: {
    label: "Desc",
    inputType: "input",
    inputMode: "numeric",
    isRequired: true,
    isEditable: true,
    value: "",
  },
  precoTotalProduto: {
    label: "Preço Total",
    inputType: "input",
    inputMode: "numeric",
    isRequired: true,
    isEditable: true,
    value: "",
    isLocked: true,
  },
  descricaoProduto: {
    label: "Descrição",
    inputType: "input",
    inputMode: "text",
    isRequired: true,
    isEditable: true,
    value: "",
    isLocked: true,
  },
};
