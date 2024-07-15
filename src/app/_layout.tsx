import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyDrawer from "./(tabs)/_layout";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Index} options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" component={MyDrawer} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <MyStack />
  );
}