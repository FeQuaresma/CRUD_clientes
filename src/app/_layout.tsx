import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyDrawer from "./(tabs)/_layout";
import Teste from "./teste";
import ModuleList from "../components/moduleList";
import TableTest from "./tableTest";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="teste">
      <Stack.Screen
        name="index"
        component={Index}
        options={{
          // headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        component={MyDrawer}
        options={{
          // headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="teste"
        component={ModuleList}
        options={{
          // headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="tableTest"
        component={TableTest}
        options={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
