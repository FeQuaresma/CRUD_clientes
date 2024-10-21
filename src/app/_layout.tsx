// Primeiro arquivo que é acessado pelo app, antes de qualquer coisa
// A função cria uma um stack navigation para as paginas inciiais

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyApp from "./modules/_layout";
import { useState } from "react";
import { modulesParamV2 } from "../constants/moduleParamV2";
import { ModuleParam } from "../types";

// Cria o stack navigation, um tipo de navegador parecido com o de navegadores
const Stack = createNativeStackNavigator();

export default function App() {
  // Esse Objeto serve para servir de aplicativo vazio, para ocupar o primeiro estado do appJson antes de carregar o primeiro json.
  const tempObj: ModuleParam = {
    temp: true,
    console: { log: "" },
    modules: {
      temp: { moduleName: "Temp", pages: {} },
    },
  };

  // Esse Objeto controla todo o aplicativo, todos os modulos, paginas, componentes, funções, aparência, e outras configurações
  const [appJson, setAppJson] = useState<ModuleParam>(modulesParamV2);

  return (
    <Stack.Navigator
      initialRouteName="teste"
      screenOptions={{
        headerShown: false,
        orientation: "all",
        gestureEnabled: false,
      }}
    >
      {/* Inicio da navegação, o proposito é carregar os dados corretos para abrir a aplicação que o usuario deseja */}
      <Stack.Screen name="index">
        {(e) => <Index {...e} appJson={appJson} setAppJson={setAppJson} />}
      </Stack.Screen>

      {/* Inicio da aplicação, ela lê o appJson e começa a renderizar os componentes de acordo com o objeto */}
      <Stack.Screen name="modules">
        {(e) => <MyApp appJson={appJson} setAppJson={setAppJson} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
