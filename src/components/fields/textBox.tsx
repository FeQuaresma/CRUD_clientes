import { TextInput } from "react-native";
import { styles } from "@/src/constants/styles";

export default function TextBox({ field, onValueChange }: any) {
  return (
    <TextInput
      multiline
      style={styles.inputBox}
      value={field ? field.value : null}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={(e) => onValueChange(e)}
    />
  );
}
