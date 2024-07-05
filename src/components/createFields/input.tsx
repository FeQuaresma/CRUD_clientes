import { styles } from "@/src/constants/styles";
import callAPI from "@/src/functions/callAPI";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange, apiData }: any) {
  return (
    <TextInput
      placeholder={field.placeholder}
      style={{ ...styles.input, ...field.customStyle }}
      value={field.valueMasked ? field.valueMasked : field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={async (e) => {
        apiData = field.link && e.length === 8 ? await callAPI(field.link, e) : null;
        //console.log('input ln15: ', apiData)
        onValueChange(e, apiData);
      }}
    />
  );
}
