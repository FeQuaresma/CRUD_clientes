import { Pressable, ScrollView, Text } from "react-native";import * as React from "react";
import { styles } from "../../constants/styles";
import { useNavigationState } from "@react-navigation/native";

export default function Home(){
  
  const routes = useNavigationState(state => state);
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Home</Text>
      <Pressable style={styles.button} onPress={() => console.log(routes.routeNames)}>
        <Text>NavigationRef</Text>
      </Pressable>
    </ScrollView>
  );
}
