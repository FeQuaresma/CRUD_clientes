const params = {
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
    customCSS: {},
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
    label: "Consumidor final ",
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
      { label: "Acre", value: "AC" },
      { label: "Alagoas", value: "AL" },
      { label: "Amapá", value: "AP" },
      { label: "Amazonas", value: "AM" },
      { label: "Bahia", value: "BA" },
      { label: "Ceará", value: "CE" },
      { label: "Distrito Federal", value: "DF" },
      { label: "Espírito Santo", value: "ES" },
      { label: "Goiás", value: "GO" },
      { label: "Maranhão", value: "MA" },
      { label: "Mato Grosso", value: "MT" },
      { label: "Mato Grosso do Sul", value: "MS" },
      { label: "Minas Gerais", value: "MG" },
      { label: "Pará", value: "PA" },
      { label: "Paraíba", value: "PB" },
      { label: "Paraná", value: "PR" },
      { label: "Pernambuco", value: "PE" },
      { label: "Piauí", value: "PI" },
      { label: "Rio de Janeiro", value: "RJ" },
      { label: "Rio Grande do Norte", value: "RN" },
      { label: "Rio Grande do Sul", value: "RS" },
      { label: "Rondônia", value: "RO" },
      { label: "Roraima", value: "RR" },
      { label: "Santa Catarina", value: "SC" },
      { label: "São Paulo", value: "SP" },
      { label: "Sergipe", value: "SE" },
      { label: "Tocantins", value: "TO" },
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
    label: "Contato",
    inputType: "input",
    inputMode: "text",
    value: "",
    maxLength: 60,
    isRequired: true,
    isEditable: true,
  },
};

const modulesParam = {
  cliente: {
    moduleName: "Cliente",
    formParam: {
      cnpjcpf: params.cnpjcpf,
      idestrageiro: params.idestrageiro,
      insc: params.insc,
      nomefantasia: params.nomefantasia,
      contribuinteicms: params.contribuinteicms,
      nomefantasia: params.nomefantasia,
      consumidorfinal: params.consumidorfinal,
      razaosocial: params.razaosocial,
      cep: params.cep,
      endereco: params.endereco,
      params.endereconome: params.endereconome,
      params.endereconumero: params.endereconumero,
      params.enderecocomplemento: params.enderecocomplemento,
      params.enderecoestado: params.enderecoestado,
      params.endereco

    },
  },
  transportadora: {
    moduleName: "Transportadora",
    formaParam: [],
  },
};

console.log(modulesParam.cliente.formParam);