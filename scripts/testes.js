const doSum = (a, b) => {
  a = Number(a);
  b = Number(b);
  console.log(typeof a, typeof b);
  console.log(a, b);
  console.log(isNaN(b));
  if (isNaN(a) || isNaN(b)) {
    throw new Error("Não é um número");
  }
  let sum = a + b;
  return sum;
};

try {
  console.log(doSum("20","g"))
} catch (e) {
  console.error(e.message)
}