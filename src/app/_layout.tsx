import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Index from ".";
import MyDrawer from "./(tabs)/_layout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Index}
          options={{
            headerShown: false,
            statusBarStyle: "light",
            statusBarTranslucent: true,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          component={MyDrawer}
          options={{
            headerShown: false,
            statusBarStyle: "light",
            statusBarTranslucent: true,
          }}
        />
      </Stack.Navigator>
  );
}
