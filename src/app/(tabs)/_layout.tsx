import React, { useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import { modulesParam } from "@/src/constants/moduleParam";
import ModuleForm from "@/src/components/moduleForm";
import ModuleIndex from "@/src/components/moduleIndex";
import ModuleList from "@/src/components/moduleList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const moduleArray: any = {};

Object.keys(modulesParam).map((moduleObject) => {
  moduleArray[moduleObject] = () => (
    <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
      <Drawer.Screen
        name={`${moduleObject}Home`}
        options={{
          title: `${moduleObject}Home`,
          headerShown: false,
        }}
      >
        {(e) => (
          <ModuleIndex
            {...e}
            moduleName={modulesParam[moduleObject].moduleName}
            style={{ color: "black" }}
          />
        )}
      </Drawer.Screen>

      {modulesParam[moduleObject]?.tableParam && (
        <Drawer.Screen
          name={`${moduleObject}List`}
          options={{
            title: `${moduleObject}List`,
            headerShown: false,
          }}
        >
          {(e) => (
            <Stack.Navigator initialRouteName="ModuleList">
              <Stack.Screen
                name="ModuleList"
                options={{
                  headerShown: false,
                }}
                initialParams={{}}
              >
                {(f) => (
                  <ModuleList
                    {...e}
                    {...f}
                    moduleParam={modulesParam[moduleObject]}
                    urlParam={modulesParam[moduleObject].tableURL}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="FilterModal"
                options={{
                  headerShown: false,
                }}
              >
                {(f) => (
                  <ModuleForm
                    {...e}
                    {...f}
                    formParam={modulesParam[moduleObject].tableParam}
                    formMode="filter"
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      )}
      <Drawer.Screen
        name={`${moduleObject}Form`}
        options={{
          title: `${moduleObject}Form`,
          headerShown: false,
        }}
      >
        {(e) => (
          <ModuleForm
            {...e}
            formParam={modulesParam[moduleObject].formParam}
            formMode="register"
          />
        )}
      </Drawer.Screen>
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
      {Object.keys(moduleArray).map((moduleObject) => (
        <Drawer.Screen
          key={moduleObject}
          name={moduleObject}
          component={moduleArray[moduleObject]}
          options={{
            title: modulesParam[moduleObject].moduleName,
            headerShown: false,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
