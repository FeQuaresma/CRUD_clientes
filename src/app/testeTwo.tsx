import { useState } from "react";
import { TextInput, View } from "react-native";

export default function TesteMask() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  
  const maskArray = [
    [/(\d+)(\d{2})$/, "R$ $1,$2", 3],
    [/(\d+)$/, "R$ 0,$1", 2],
    [/(\d+)$/, "R$ 0,0$1", 1],
  ];

  const maskArray2 = [
    [/^(\d{2})(\d{1,5})(\d{1,4})$/, "$1.$2-$3", 11],
    [/^(\d{0,2})(\d{0,4})(\d{0,4})$/, "$1.$2-$3", 1]
  ];

  function maskedValue(value: string, mask: any) {

    value = value.replace(/\D/g, "").replace(/^0+/, "") || "";
    for (let i = 0; i < mask.length; i++) {
      if (value.length >= mask[i][2]) {
        value = value.replace(mask[i][0], mask[i][1]);
        break;
      }
    }
    while (/[^\w\s]$/.test(value)) {
      value = value.slice(0,-1)
    }
    return value;
    
  }

  function handleInputChange(value: string, array: any[]) {
    return maskedValue(value, array);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <TextInput
        style={{ width: 200, backgroundColor: "white", padding: 6 }}
        value={inputValue}
        placeholder="R$ 0,00"
        inputMode="numeric"
        onChangeText={(e) => setInputValue(handleInputChange(e, maskArray))}
      />
      <TextInput
        style={{ width: 200, backgroundColor: "white", padding: 6 }}
        value={inputValueTwo}
        placeholder="(00)00000-0000"
        maxLength={14}
        inputMode="numeric"
        onChangeText={(e) => setInputValueTwo(handleInputChange(e, maskArray2))}
      />
    </View>
  );
}
