import { ScrollView, Text } from "react-native";
import { styles } from "../constants/styles";

export default function ModuleList ({moduleName}:any) {
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Listagem {moduleName}</Text>
    </ScrollView>
  )
}