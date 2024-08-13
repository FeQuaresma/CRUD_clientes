const mask = [
  [/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3", 11],
  [/^(\d{2})(\d{4})(\d{4})$/, "($1)$2-$3", 10],
];

function formatPhoneNumber(value) {
  const numericValue = value.replace(/\D/g, "");

  for (const [pattern, format, length] of mask) {
    if (numericValue.length === length) {
      return numericValue.replace(pattern, format);
    }
  }
  
  return numericValue;
}

console.log(formatPhoneNumber("11949174470"));
console.log(formatPhoneNumber("1139312959")); 
