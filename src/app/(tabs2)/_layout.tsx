import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";

const Drawer = createDrawerNavigator();

export default function MyDrawer2() {
  return (
    <Drawer.Navigator backBehavior="history">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "home",
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
