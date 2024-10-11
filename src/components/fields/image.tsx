import { sumClass } from "@/src/functions/sumClass";
import { Image as ImageRN } from "react-native";

export default function Image ({ field,classes }: any) {
  return(
    <ImageRN
    style={{...sumClass(field.class, classes), ...field.style}}
    source={{uri: field.source}}
    />
    
  )
}