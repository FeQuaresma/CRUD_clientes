const math = ([a, b]) => {
  return a + b;
};

let funcName = "math"
let param = [15, 20];

const dynamicFunc = new Function(funcName, param, `return ${funcName}(${param});`);
console.log(dynamicFunc())

// const result = dynamicFunc();
// //const result = math(param)

// console.log(result)
