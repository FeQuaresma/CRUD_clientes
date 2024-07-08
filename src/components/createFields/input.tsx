import { styles } from "@/src/constants/styles";
import { callAPI, validateCPF } from "@/src/functions";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange }: any) {
  let errorMsg: any;

  return (
    <TextInput
      placeholder={field.placeholder}
      style={{ ...styles.input, ...field.customStyle }}
      value={field.valueMasked ? field.valueMasked : field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={async (e) => {
        const apiData =
          field.link && e.length === field.link.paramSize
            ? await callAPI(field.link, e)
            : null;
        if (field.function && field.function.includes("validateCPF")) {
          !validateCPF(e) ? (errorMsg = "CPF inválido") : (errorMsg = "");
        }
        onValueChange(e, apiData, errorMsg);
      }}
    />
  );
}
