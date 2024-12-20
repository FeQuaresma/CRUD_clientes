import { sumClass } from "@/src/functions/sumClass";
import { Pressable, Text } from "react-native";

export default function Button ({ field,onPress,classes }: any) {
  
  return(
    <Pressable onPress={() => onPress()}>
      <Text style={{...sumClass(field.class, classes), ...field.style}}>{field.value}</Text>
    </Pressable>
    
  )
}