import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyDrawer from "./(tabs)/_layout";
import ModuleList from "../components/moduleList";
import TableTest from "./tableTest";
import TableNavigator from "./tableNavigator";
import TesteCalendar from "./testeThree";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="teste" screenOptions={{headerShown: false, 
      orientation: "all", gestureEnabled: false}}>
      <Stack.Screen
        name="index"
        component={Index}
      />
      <Stack.Screen
        name="(tabs)"
        component={MyDrawer}
      />
      <Stack.Screen
        name="teste"
        component={ModuleList}
      />
      <Stack.Screen
        name="tableTest"
        component={TableTest}
      />
      <Stack.Screen
        name="useStateTable"
        component={TesteCalendar}
      />
      <Stack.Screen
        name="tableNavigator"
        component={TableNavigator}
      />
    </Stack.Navigator>
  );
}
