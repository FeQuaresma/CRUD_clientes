import { Switch, View } from "react-native";

export default function Boolean({ field, onValueChange }: any) {
  return (
      <Switch
        style={{alignSelf: "flex-start"}}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={!field.value ? "white" : "blue"}
        ios_backgroundColor="#3e3e3e"
        value={field.value}
        onValueChange={(e) => onValueChange(e)}
      />
  );
}
