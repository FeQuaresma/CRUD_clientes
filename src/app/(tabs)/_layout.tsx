import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import CreateForm from "../../components/createForm";
import { modulesParam } from "@/src/constants/moduleParam";

const Drawer = createDrawerNavigator();

const formArray:any = {}

Object.keys(modulesParam).map((form:string)=>{
  formArray[form] = () => <CreateForm key={form} formParam={modulesParam[form].formParam} />
})

export default function MyDrawer() {
  
  return (
    <Drawer.Navigator>

      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "home",
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Calculadora"
        component={Calculator}
        options={{
          title: "calculator",
          headerShown: false,
        }}
      />

      {Object.keys(formArray).map((form)=> 
      <Drawer.Screen
      key={form}
      name={form}
      component={formArray[form]}
      options={{
        title: form,
        headerShown: false,
      }}
      />
    )}

    </Drawer.Navigator>
  );
}
