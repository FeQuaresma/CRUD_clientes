import { Pressable, ScrollView, Text } from "react-native";
import { styles } from "../../constants/styles";

export default function Home({ navigationRef }:any){
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Home</Text>
      <Pressable style={styles.button} onPress={() => navigationRef.navigate("NavigationRef")}>
        <Text>NavigationRef</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(navigationRef)}>
        <Text>NavigationRef</Text>
      </Pressable>
    </ScrollView>
  );
}
