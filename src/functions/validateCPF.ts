export default function validateCPF(cpf: string) {
  //valida se o cpf tem 11 digitos
  if (cpf.length != 11) {
    return false;
  } else {
    let sum = 0;
    let digit = "";
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf[i]) * (i + 1);
    }
    digit = sum % 11 >= 10 ? "0" : String(sum % 11);
    if (digit != cpf[9]) {
      return false;
    } else {
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += Number(cpf[i]) * i;
      }
      digit = sum % 11 >= 10 ? "0" : String(sum % 11);
    }
    if (digit != cpf[10]) {
      return false;
    } else {
      return true;
    }
  }
}
