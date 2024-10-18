import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyApp from "./modules/_layout";
import { useState } from "react";
import { ModuleParam, modulesParamV2 } from "../constants/moduleParamV2";

const Stack = createNativeStackNavigator();

export default function App() {
  const tempObj: ModuleParam = {
    temp: true,
    console: {log: ''},
    modules:{
      temp:{moduleName:"Temp",pages:{}}
    },
  };
  const [appJson, setAppJson] = useState<ModuleParam>(tempObj);


  return (
    <Stack.Navigator
      initialRouteName="teste"
      screenOptions={{
        headerShown: false,
        orientation: "all",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="index">{(e) => <Index {...e} appJson={appJson} setAppJson={setAppJson}/>}</Stack.Screen>
      <Stack.Screen name="modules">
        {(e) => <MyApp appJson={appJson} setAppJson={setAppJson}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
