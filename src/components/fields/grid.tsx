import { TextInput, View } from "react-native";
import { styles } from "@/src/constants/styles";

export default function Grid({ field, onValueChange }: any) {
  const { gridSize } = field;
  const rows = Array.from({ length: gridSize }, (_, i) => i);

  return (
    <View
      style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", width: 200 }}
    >
      {rows.map((item) => {
        return (
          <TextInput
            style={{
              ...styles.input,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 1,
              width: "33%",
            }}
            key={item}
          />
        );
      })}
    </View>
  );
}
