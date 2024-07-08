export const FormParam: {} = {
  cpfCnpj: {
    label: "CPF/CNPJ",
    inputType: "input",
    inputMode: "numeric",
    placeholder: "CPF ou CNPJ",
    masks: ["###.###.###-##", "##.###.###/####-##"],
    value: "",
    valueMasked: "",
    maxLength: 18,
    function: ["validateCPF"],
    errorMsg: "",
  },
};
