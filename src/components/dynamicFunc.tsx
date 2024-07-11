import { Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";

import functionsConfig from "../constants/functionsConfig";
import { loadFunctions } from "../functions/loadFunctions";
import { useEffect, useState } from "react";

type FunctionName = keyof typeof functionsConfig;
type ParamType = [number, number];

export default function DynamicFunc() {
  const [loadedFunctions, setLoadedFunctions] = useState<((...args: any[]) => any) | null>(null);
  const numberParam: ParamType = [10, 5,];
  const url = "https://www.caae.org.br/teste/functions.json?teste=2";
  const funcName = "doMinus";

  useEffect(() => {
    loadFunctions(url).then((funcs) => {
      //console.log("tsx ln 19: " + funcs[funcName].toString());
      //const dataFunc = eval(funcs[funcName]);
      // console.log(dataFunc(20, 30));
      setLoadedFunctions(() => eval(funcs[funcName]));
    });
  }, []);

  const handleFunctions = (funcName: FunctionName, params: ParamType) => {
    if (loadedFunctions && loadedFunctions) {
      console.log("tsx ln 28: "+loadedFunctions.toString());
      const result = loadedFunctions(...params);
      console.log("tsx ln 30: "+result);
    } else {
      console.error("loadedFunctions is not defined");
    }

    // if (functionsConfig[funcName]) {
    //   const dynamicFunctionName = functionsConfig[funcName]
    //     .function as keyof typeof functions;
    //   if (functions[dynamicFunctionName]) {
    //     const result = functions[dynamicFunctionName](...params); // segredo ta aqui
    //     console.log(result);
    //   } else {
    //     console.error("func not found");
    //   }
    // }
    return null;
  };

  return (
    <View>
      {Object.keys(functionsConfig).map((func) => (
        <View key={func}>
          <Pressable
            style={styles.button}
            onPress={() => handleFunctions(func, numberParam)}
          >
            <Text style={styles.buttonText}>{functionsConfig[func].label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
