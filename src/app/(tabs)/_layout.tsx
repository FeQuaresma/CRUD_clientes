import React, { useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import { modulesParam } from "@/src/constants/moduleParam";
import ModuleForm from "@/src/components/moduleForm";
import ModuleIndex from "@/src/components/moduleIndex";
import ModuleList from "@/src/components/moduleList";

const Drawer = createDrawerNavigator();
const moduleArray: any = {};

Object.keys(modulesParam).map((moduleObject) => {
  const ModuleIndexComponent = () => (
    // <ModuleIndex />
    <ModuleIndex moduleName={modulesParam[moduleObject].moduleName} style={{color: "black"}}/>
  );
  const ModuleListComponent = () => (
    <ModuleList />
    // <ModuleList moduleName={modulesParam[moduleObject].moduleName} />
  );
  const ModuleFormComponent = () => (
    <ModuleForm formParam={modulesParam[moduleObject].formParam} />
  );
  moduleArray[moduleObject] = () => (
    <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
      <Drawer.Screen
        name={`${moduleObject}Home`}
        component={ModuleIndexComponent}
        options={{
          title: `${moduleObject}Home`,
          // headerShown: false,
        }}
      />
      <Drawer.Screen
        name={`${moduleObject}Home2`}
        component={ModuleIndexComponent}
        options={{
          title: `${moduleObject}Home2`,
          // headerShown: false,
        }}
      />
      <Drawer.Screen
        name={`${moduleObject}List`}
        component={ModuleListComponent}
        options={{
          title: `${moduleObject}List`,
          // headerShown: false,
        }}
      />
      <Drawer.Screen
        name={`${moduleObject}Form`}
        component={ModuleFormComponent}
        options={{
          title: `${moduleObject}Form`,
          // headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
});

export default function MyDrawer() {

  return (
    <Drawer.Navigator backBehavior="history">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "home",
          // headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Calculadora"
        component={Calculator}
        options={{
          title: "calculator",
          // headerShown: false,
        }}
      />
      {Object.keys(moduleArray).map((moduleObject) => (
        <Drawer.Screen
          key={moduleObject}
          name={moduleObject}
          component={moduleArray[moduleObject]}
          options={{
            title: modulesParam[moduleObject].moduleName,
            // headerShown: false,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
