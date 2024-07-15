import { ScrollView, Text } from "react-native";
import { styles } from "../../constants/styles";

export default function Home(){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.inputLabel}>Home</Text>
    </ScrollView>
  );
}
