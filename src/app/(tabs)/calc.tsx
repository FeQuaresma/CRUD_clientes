import { Pressable, ScrollView, Text } from "react-native";import * as React from "react";
import { styles } from "../../constants/styles";
import DynamicFunc from "../../components/dynamicFunc";
import { useNavigationState } from '@react-navigation/native';

export default function Calculator({ navigation }:any) {

  const routes = useNavigationState(state => state.routes);
  

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <DynamicFunc />
      <Pressable style={styles.button} onPress={()=> console.log(routes)}><Text style={styles.buttonText}>Push</Text></Pressable>
    </ScrollView>
  );
}
