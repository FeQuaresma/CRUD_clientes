import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyApp from "./(tabs)/_layout";
import { useEffect } from "react";
import { stringArray} from "../functions/teste";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Stack.Navigator
      initialRouteName="teste"
      screenOptions={{
        headerShown: false,
        orientation: "all",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="(tabs)" component={MyApp} />
    </Stack.Navigator>
  );
}
