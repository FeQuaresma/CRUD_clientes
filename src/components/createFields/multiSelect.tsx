import { styles } from "@/src/constants/styles";
import { MultiSelect as DropdownMulti } from "react-native-element-dropdown";

export default function MultiSelect({ field, onValueChange }: any) {
  return (
    <DropdownMulti
      itemTextStyle={styles.dropdown}
      selectedTextStyle={styles.dropdownMulti}
      placeholderStyle={styles.dropdown}
      style={styles.input}
      data={field.options}
      placeholder="Selecione"
      labelField="label"
      valueField="value"
      value={field.value}
      onChange={(e) => onValueChange(e)}
      mode="modal"
    />
  );
}
