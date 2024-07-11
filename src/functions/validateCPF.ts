export default function validateCPF(cpf: string) {
  if (cpf.length != 11) {
    return false;
  } else {
    let firstSum = 0;
    let secondSum = 0;
    let firstDigit = "";
    let secondDigit = "";
    for (let i = 0; i < 10; i++) {
      i < 9 ? (firstSum += Number(cpf[i]) * (i + 1)) : null;
      secondSum += Number(cpf[i]) * i;
    }
    firstDigit = firstSum % 11 >= 10 ? "0" : String(firstSum % 11);
    secondDigit = secondSum % 11 >= 10 ? "0" : String(secondSum % 11);
    if (firstDigit != cpf[9] || secondDigit != cpf[10]) {
      return false;
    } else {
      return true;
    }
  }
}
