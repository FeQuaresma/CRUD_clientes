import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinalTable from "./finalTable";
import ModuleForm from "../components/moduleForm";

import { modulesParam } from "../constants/moduleParam";

const Stack = createNativeStackNavigator();


export default function TableNavigator() {
  return (
    <Stack.Navigator initialRouteName="FinalTable">
      <Stack.Screen
        name="FinalTable"
        component={FinalTable}
        options={{
          headerShown: false,
        }}
        initialParams={{}}
      />

      <Stack.Screen
        name="FilterModal"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      >
        {(e) => <ModuleForm {...e}  formParam={modulesParam.pedido.tableParam} formMode={"filter"}/>}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
