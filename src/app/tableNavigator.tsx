import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinalTable from "./finalTable";
import Index from ".";
import { Modal, Pressable, Text, View } from "react-native";
import ModuleForm from "../components/moduleForm";

import { modulesParam } from "../constants/moduleParam";
import { Table } from "react-native-reanimated-table";

const Stack = createNativeStackNavigator();

function ModalScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Dismiss</Text>
      </Pressable>
    </View>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Pressable onPress={() => navigation.navigate("MyModal")}>
        <Text>Open Modal</Text>
      </Pressable>
    </View>
  );
}

export default function TableNavigator({ navigation }: any) {
  return (
    <Stack.Navigator initialRouteName="FinalTable">
      <Stack.Screen
        name="FinalTable"
        component={FinalTable}
        options={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
        initialParams={{}}
      />

      <Stack.Screen
        name="FilterModal"
        options={{
          presentation: "modal",
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
        }}
      >
        {(e) => <ModuleForm {...e}  formParam={modulesParam.cliente.tableParam} formMode={"filter"}/>}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
