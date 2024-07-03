export const FormParam: any = {
  cep: {
    label: "CEP",
    inputType: "input",
    inputMode: "numeric",
    placeholder: "CEP",
    maxLength: 8,
    value: "",
    link: {
      paramBeginning: "https://viacep.com.br/ws/",
      paramEnd: "/json/",
      correspondKey: ["logradouro"]
    },
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
    inputType: "dropdown",
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
    inputType: "dropdownMulti",
    options: [
      { label: "Vermelho", value: "vermelho" },
      { label: "Verde", value: "verde" },
      { label: "Azul", value: "azul" },
      { label: "Amarelo", value: "amarelo" }
    ],
    value: "",
  },
  field7: {
    label: "Já é cliente?",
    inputType: "switch",
    value: false,
  },
  field8: {
    label: "Baixar Pdf",
    inputType: "action",
    value: null,
    dataType:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png",
    action:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png",
  },
  field9: {
    label: "Anexar um arquivo",
    inputType: "file",
    value: {},
  },
  // field10: {
  //   label: "Data de Compra",
  //   inputType: "date",
  //   value: "",
  // },
};
