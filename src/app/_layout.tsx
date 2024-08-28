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
    <Stack.Navigator initialRouteName="teste">
      <Stack.Screen
        name="index"
        component={Index}
        options={{
          headerShown: false,
          orientation: "all"
        }}
      />
      <Stack.Screen
        name="(tabs)"
        component={MyDrawer}
        options={{
          headerShown: false,
          orientation: "all"

        }}
      />
      <Stack.Screen
        name="teste"
        component={ModuleList}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="tableTest"
        component={TableTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="useStateTable"
        component={TesteCalendar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tableNavigator"
        component={TableNavigator}
        options={{
          headerShown: false,
          // statusBarStyle: "light",
          // statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
