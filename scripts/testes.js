const mask = [
  [/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3", 11],
  [/^(\d{2})(\d{4})(\d{4})$/, "($1)$2-$3", 10],
];

function cellValueMask(value) {
  
  if (mask) {
    const cleanValue = value.replace(/\D/g, "");
    for (let i = 0; i < mask.length; i++) {
      if (cleanValue.length === mask[i][2]) {
        return cleanValue.replace(mask[i][0],mask[i][1]);
      }
    }
  }

  return value;
}

console.log(formatPhoneNumber("11949174470"));
console.log(formatPhoneNumber("1139312959")); 
