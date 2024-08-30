import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyDrawer from "./(tabs)/_layout";
import MyDrawer2 from "./(tabs2)/_layout";

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
        name="(tabs2)"
        component={MyDrawer2}
      />
    </Stack.Navigator>
  );
}
