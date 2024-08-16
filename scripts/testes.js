function formatCurrency(value) {
  // Remove todos os espaços e o símbolo "R$" se existir
  value = value.replace(/[^\d.,]/g, '');

  // Verifica se o valor possui mais de um ponto ou mais de uma vírgula
  const countDot = (value.match(/\./g) || []).length;
  const countComma = (value.match(/,/g) || []).length;

  if (countDot > 1 || countComma > 1) {
      // Remove todos os caracteres especiais
      value = value.replace(/[^0-9]/g, '');
      return value.length > 2 
          ? `${value.slice(0, -2)}.${value.slice(-2)}`
          : value;
  }

  // Separa o valor em duas partes: antes e depois do último ponto ou vírgula
  const lastSeparator = Math.max(value.lastIndexOf('.'), value.lastIndexOf(','));

  if (lastSeparator !== -1) {
      const integerPart = value.substring(0, lastSeparator).replace(/[^0-9]/g, '');
      const decimalPart = value.substring(lastSeparator + 1).replace(/[^0-9]/g, '');
      return `${integerPart}.${decimalPart}`;
  }

  // Se não houver ponto ou vírgula, retornar o valor sem modificações
  return value.replace(/[^0-9]/g, '');
}

// Exemplos de uso
console.log(formatCurrency("R$ 123.456.789,00")); // "123456789.00"
console.log(formatCurrency("R$ 123,456,789.00")); // "123456789.00"
console.log(formatCurrency("123456789.00"));      // "123456789.00"
console.log(formatCurrency("123456789,00"));      // "123456789.00"
console.log(formatCurrency("R$ 1.234,56"));       // "1234.56"
console.log(formatCurrency("12,34.56"));          // "123456"

console.log(formatCurrency("550,3"));          // "123456"