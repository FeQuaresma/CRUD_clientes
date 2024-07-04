import { styles } from "@/src/constants/styles";
import callAPI from "@/src/functions/callAPI";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange }: any) {
  return (
    <TextInput
      placeholder={field.placeholder}
      style={{ ...styles.input, ...field.customStyle }}
      value={field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={(e) => {
        onValueChange(e);
        {
          field.link && callAPI(field.link, e);
        }
      }}
    />
  );
}
