import { Pressable, ScrollView, Text } from "react-native";
import { styles } from "../../constants/styles";
import { useNavigationState } from "@react-navigation/native";

export default function Home({ onCallBack, appJson }: any) {
  const routes = useNavigationState((state) => state);
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Home</Text>
      <Pressable style={styles.button} onPress={() => onCallBack(appJson)}>
        <Text>Teste</Text>
      </Pressable>
    </ScrollView>
  );
}
