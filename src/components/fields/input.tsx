import { sumClass } from "@/src/functions/sumClass";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange, classes }: any) {
  let errorMsg: any;
  let fillForm: any;

  return (
    <TextInput
      placeholder={field.placeholder}     
      editable={field.isEditable}
      style={{...sumClass(field.class, classes), ...field.css}}
      value={field.valueMasked ? field.valueMasked : field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={async (e) => {
        onValueChange(e, fillForm, errorMsg);
      }}
    />
  );
}
