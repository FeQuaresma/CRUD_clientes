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
  customCSS?: object;
  function?: string[];
  options?: { label: string; value: string }[];
  link?: {
    paramBeginning: string;
    paramSize: number;
    paramEnd: string;
    type: "fillform" | "errorMsg" | null;
  };
};

export type Param = {
  [key: string]: FormParam;
};

export const params: Param = {
  cnpjcpf: {
    label: "CNPJ/CPF",
    inputType: "input",
    inputMode: "numeric",
    value: "",
    placeholder: "CPF ou CNPJ",
    masks: ["###.###.###-##", "##.###.###/####-##"],
    valueMasked: "",
    maxLength: 18,
    isRequired: true,
    isEditable: false,
    customCSS: {color: "black"},
    function: ["validateCPF", "validateCNPJ"],
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
    masks: ["#####-###"],
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
};
