import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import Enderecos from "./enderecos";

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen
        name="Enderecos"
        component={Enderecos}
        options={{
          title: "enderecos",
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
