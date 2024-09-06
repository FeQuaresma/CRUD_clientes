import { styles } from "@/src/constants/styles";
import { Pressable, Text } from "react-native";

export default function Button ({ field,callFather }: any) {
  return(
    <Pressable onPress={e => callFather("Botão")} style={styles.button}>
      <Text style={styles.buttonText}>{field.value}</Text>
    </Pressable>
  )
}