import { styles } from "@/src/constants/styles";
import { Dropdown } from "react-native-element-dropdown";

export default function Select({field, onValueChange}:any) {
  return (
    <Dropdown
      itemTextStyle={styles.dropdown}
      selectedTextStyle={styles.dropdown}
      placeholderStyle={styles.dropdown}
      style={styles.input}
      data={field.options}
      placeholder="Selecione"
      labelField="label"
      valueField="value"
      value={field.value}
      onChange={(e) => onValueChange(e.value)}
      mode="modal"
    />
  );
}
