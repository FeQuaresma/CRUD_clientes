import { ScrollView, Text, View } from "react-native";

export default function Log({ logString }: any) {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView style={{paddingTop: 20}}>
        <Text style={{ color: "green" }}>{logString}</Text>
      </ScrollView>
    </View>
  );
}
