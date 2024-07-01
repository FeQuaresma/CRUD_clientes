export const FormParam: any = {
  field1: {
    label: "CNPJ",
    inputType: "input",
    inputMode: "numeric",
    maxLength: 11,
    value: "",
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
    ], value: "",
  }, field4: {
    label: "Observações",
    inputType: "textBox",
    inputMode: "text",
    maxLength: 60,
    value: "",
  }, field5: {
    label: "Data de Cadastro",
    inputType: "date",
    value: "",
  }, field6: {
    label: "Anexar um arquivo",
    inputType: "file",
    value: "",
  }, field7: {
    label: "Cores",
    inputType: "selectMulti",
    options: [
      { label: "Vermelho", value: "vermelho" },
      { label: "Verde", value: "verde" },
      { label: "Azul", value: "azul" },
    ], value: "",
  }, field9: {
    label: "Já é cliente",
    inputType: "checkBox",
    options: [{ label: "Sim", value: "sim" }],
    value: "", 
  }, field10: {
    label: "Baixar Pdf",
    inputType: "action",
    dataType: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png",
    action: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
  }
};
