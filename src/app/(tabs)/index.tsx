import { Pressable, ScrollView, Text } from "react-native";
import { styles } from "../../constants/styles";
import { useNavigationState } from "@react-navigation/native";

export default function Home({ navigationRef }:any){
  
  const routes = useNavigationState(state => state);
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Home</Text>
      <Pressable style={styles.button} onPress={() => navigationRef.navigate("NavigationRef")}>
        <Text>NavigationRef</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => console.log(routes.routeNames)}>
        <Text>NavigationRef</Text>
      </Pressable>
    </ScrollView>
  );
}
