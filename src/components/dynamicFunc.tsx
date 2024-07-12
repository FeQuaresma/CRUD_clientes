import { Pressable, Text, View, TextInput } from "react-native";
import { styles } from "../constants/styles";

import functionsConfig from "../constants/functionsConfig";
import { loadFunctions } from "../functions/loadFunctions";
import { useEffect, useState } from "react";

const url = "https://www.caae.org.br/teste/functions.json?teste="+Math.floor(Math.random() * 9999);

export default function DynamicFunc() {
  const [loadedFunctions, setLoadedFunctions] = useState<any>();
  const [numberParam, setNumberParam] = useState({
    number1: "",
    number2: "",
  });
  const [result, setResult] = useState<string>();


  
  useEffect(() => {
    loadFunctions(url).then((funcs) => {
      setLoadedFunctions(funcs);
      console.log("Funções carregadas!")
    });
  }, []);

  
  const handleFunctions = (funcName: any) => {
    try {
    if (loadedFunctions) {
      switch (funcName) {
        case "doMinus":
          if (loadedFunctions[funcName])
            setResult(
              String(
                loadedFunctions.doMinus(
                  numberParam.number1,
                  numberParam.number2
                )
              )
            );
          break;
        case "doSum":
          if (loadedFunctions[funcName])
            setResult(
              String(
                loadedFunctions.doSum(
                  numberParam.number1,
                  numberParam.number2
                )
              )
            );
          break;
        case "doMulti":
          if (loadedFunctions[funcName])
            setResult(
              String(
                loadedFunctions.doMulti(
                  numberParam.number1,
                  numberParam.number2
                )
              )
            );
          break;
        case "doDiv":
          if (loadedFunctions[funcName])
            setResult(
              String(
                loadedFunctions.doDiv(
                  numberParam.number1,
                  numberParam.number2
                )
              )
            );
          break;
      }
    }
    
  } catch (error) {
    console.error("ln 79 ",error)
  }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={numberParam.number1}
        onChangeText={(text) =>
          setNumberParam((prevState: any) => ({ ...prevState, number1: text }))
        }
        placeholder="Enter number 1"
      />
      <TextInput
        style={styles.input}
        value={numberParam.number2}
        onChangeText={(text) =>
          setNumberParam((prevState: any) => ({ ...prevState, number2: text }))
        }
        placeholder="Enter number 2"
      />
      {Object.keys(functionsConfig).map((func) => (
        <View key={func}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleFunctions(functionsConfig[func].function);
            }}
          >
            <Text style={styles.buttonText}>{functionsConfig[func].label}</Text>
          </Pressable>
        </View>
      ))}
      {result && (
        <Text style={{ ...styles.inputLabel, alignSelf: "center" }}>
          {result}
        </Text>
      )}
    </View>
  );
}
