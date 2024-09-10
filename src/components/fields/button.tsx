import { styles } from "@/src/constants/styles";
import { Pressable, Text } from "react-native";

export default function Button ({ field,onPress }: any) {
  return(
    <Pressable onPress={() => onPress()} style={styles.button}>
      <Text style={styles.buttonText}>{field.value}</Text>
    </Pressable>
  )
}