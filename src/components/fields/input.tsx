import { styles } from "@/src/constants/styles";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange }: any) {
  let errorMsg: any;
  let fillForm: any;

  return (
    <TextInput
      placeholder={field.placeholder}     
      style={{ ...styles.input, ...field.customInputCSS}}
      value={field.valueMasked ? field.valueMasked : field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={async (e) => {
        onValueChange(e, fillForm, errorMsg);
      }}
    />
  );
}
