import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyApp from "./modules/_layout";

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
      <Stack.Screen name="index">{(e) => <Index {...e} e={e}/>}</Stack.Screen>
      <Stack.Screen name="modules" component={MyApp} />
    </Stack.Navigator>
  );
}
