export const FormParam: any = {
  fields: {
    cep: {
      label: "CEP",
      inputType: "input",
      inputMode: "numeric",
      placeholder: "00000-000",
      masks: ["#####-###"],
      value: "",
      valueMasked: "",
      maxLength: 9,
      link: {
        paramBeginning: "https://viacep.com.br/ws/",
        paramSize: 8,
        paramEnd: "/json/",
      },
    },
    telefone: {
      label: "Telefone",
      inputType: "input",
      inputMode: "tel",
      placeholder: "(00) 00000-0000",
      masks: ["(##) ####-####", "(##) #####-####"],
      value: "",
      valueMasked: "",
      maxLength: 15,
    },
    cpfCnpj: {
      label: "CPF/CNPJ",
      inputType: "input",
      inputMode: "numeric",
      placeholder: "CPF ou CNPJ",
      masks: ["###.###.###-##", "##.###.###/####-##"],
      value: "",
      valueMasked: "",
      maxLength: 18,
      functions: ["validateCPF"],
      errorMsg: "CPF inválido",
    },
    field2: {
      label: "Razão Social",
      inputType: "input",
      inputMode: "text",
      maxLength: 60,
      value: "",
    },
    field3: {
      label: "Contribuinte ICMS",
      inputType: "select",
      options: [
        { label: "Contribuinte", value: "contribuinte" },
        { label: "Isento", value: "isento" },
        { label: "Não Contribuinte", value: "nao_contribuinte" },
      ],
      value: "",
    },
    field4: {
      label: "Observações",
      inputType: "textBox",
      inputMode: "text",
      maxLength: 60,
      value: "",
    },
    field5: {
      label: "Data de Cadastro",
      inputType: "date",
      value: "",
    },
    field6: {
      label: "Cores",
      inputType: "multiSelect",
      options: [
        { label: "Vermelho", value: "vermelho" },
        { label: "Verde", value: "verde" },
        { label: "Azul", value: "azul" },
        { label: "Amarelo", value: "amarelo" },
      ],
      value: "",
    },
    field7: {
      label: "Já é cliente?",
      inputType: "boolean",
      value: false,
    },
    // field8: {
    //   label: "Baixar Pdf",
    //   inputType: "action",
    //   value: null,
    //   dataType:
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png",
    //   action:
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png",
    // },
    field9: {
      buttonText: "Anexar um arquivo",
      inputType: "file",
      value: {},
    },
    Grade: {
      label: "Grade",
      inputType: "grid",
      gridSize: 12,
      maxLength: 3,
      customStyle: { maxWidth: 66, borderColor: "black" },
      value: [],
    },
    field10: {
      label: "Data de Compra",
      inputType: "date",
      value: "",
    },
  },
  cnpj: {
    cpfCnpj: {
      label: "CPF/CNPJ",
      inputType: "input",
      inputMode: "numeric",
      placeholder: "CPF ou CNPJ",
      masks: ["###.###.###-##", "##.###.###/####-##"],
      value: "",
      valueMasked: "",
      maxLength: 18,
      errorMsg: "",
      required: true,
    },
  },
  enderecos: {
    cpfCnpj: {
      label: "CPF/CNPJ",
      errorMsg: "",
      required: true,
      inputType: "input",
      inputMode: "numeric",
      placeholder: "CPF ou CNPJ",
      masks: ["###.###.###-##", "##.###.###/####-##"],
      value: "",
      valueMasked: "",
      maxLength: 18,
      functions: {validateCPF: "errorMsg"},
    },
    cep: {
      label: "CEP",
      errorMsg: "",
      required: true,
      inputType: "input",
      inputMode: "numeric",
      placeholder: "00000-000",
      masks: ["#####-###"],
      value: "",
      valueMasked: "",
      maxLength: 9,
      functions: {callAPI: "fillForm"},
      link: {
        paramBeginning: "https://viacep.com.br/ws/",
        paramSize: 8,
        paramEnd: "/json/",
      },
    },
    logradouro: {
      label: "Logradouro",
      errorMsg: "",
      required: true,
      inputType: "input",
      placeholder: "Rua/Av...",
      value: "",
      maxLength: 100,
    },
    numero: {
      label: "Número",
      errorMsg: "",
      required: true,
      inputType: "input",
      placeholder: "0000",
      value: "",
      maxLength: 4,
    },
    complemento: {
      label: "Complemento",
      errorMsg: "",
      inputType: "input",
      placeholder: "Apto./Bloco...",
      value: "",
      maxLength: 100,
    },
    bairro: {
      label: "Bairro",
      errorMsg: "",
      required: true,
      inputType: "input",
      placeholder: "Bairro...",
      value: "",
      maxLength: 100,
    },
    localidade: {
      label: "Cidade",
      errorMsg: "",
      required: true,
      inputType: "input",
      placeholder: "Cidade...",
      value: "",
      maxLength: 100,
    },
    uf: {
      label: "UF",
      errorMsg: "",
      required: true,
      inputType: "input",
      placeholder: "UF...",
      value: "",
      maxLength: 2,
    },
  },
};
