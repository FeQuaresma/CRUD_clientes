export default function validateCPF(cpf: string) {
  if (cpf.length != 11) {
    return false;
  } else {
    let firstDigit = 0;
    let secondDigit = 0;
    for (let i = 0; i < 10; i++) {
      i < 9 ? (firstDigit += Number(cpf[i]) * (i + 1)) : null;
      secondDigit += Number(cpf[i]) * i;
    }
    firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
    secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
    if (String(firstDigit) != cpf[9] || String(secondDigit) != cpf[10]) {
      return false;
    } else {
      return true;
    }
  }
}
