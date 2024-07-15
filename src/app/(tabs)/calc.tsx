import { ScrollView } from "react-native";
import { styles } from "../../constants/styles";
import DynamicFunc from "../../components/dynamicFunc";

export default function Calculator() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DynamicFunc />
    </ScrollView>
  );
}
