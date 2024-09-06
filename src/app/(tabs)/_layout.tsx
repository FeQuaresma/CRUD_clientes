import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import { modulesParam } from "@/src/constants/moduleParam";
import ModuleForm from "@/src/components/moduleForm";
import ModuleIndex from "@/src/components/moduleIndex";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Module,
  ModuleParam,
  modulesParamV2,
} from "@/src/constants/moduleParamV2";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MyApp() {
  const [appJson, setAppJson] = useState<ModuleParam>(modulesParamV2);

  function handleCallBack(
    moduleObject: any,
    page: any,
    field: any,
    value: any
  ) {
    console.log(appJson.modules[moduleObject].pages[page].components[field]);
    setAppJson((prevForm: ModuleParam) => ({
      ...prevForm,
      modules: {
        ...prevForm.modules,
        [moduleObject]: {
          ...prevForm.modules[moduleObject],
          pages: {
            ...prevForm.modules[moduleObject].pages,
            [page]: {
              ...prevForm.modules[moduleObject].pages[page],
              components: {
                ...prevForm.modules[moduleObject].pages[page].components,
                [field]: {
                  ...prevForm.modules[moduleObject].pages[page].components[
                    field
                  ],
                  value: value,
                },
              },
            },
          },
        },
      },
    }));
  }

  return (
    <Drawer.Navigator backBehavior="history">
      <Drawer.Screen
        name="Home"
        options={{
          title: "home",
          headerShown: false,
        }}
      >
        {(e: any) => (
          <Home
            {...e}
            appJson={appJson}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Calculadora"
        component={Calculator}
        options={{
          title: "calculator",
          headerShown: false,
        }}
      />

      {Object.keys(appJson.modules).map((moduleObject) => (
        <Drawer.Screen
          key={moduleObject}
          name={moduleObject}
          options={{
            title: modulesParam[moduleObject].moduleName,
            headerShown: false,
          }}
        >
          {(e) => (
            // <ModuleCreator
            //   {...e}
            //   moduleData={appJson.modules[moduleObject]}
            //   appJson={appJson}
            //   setAppJson={(f:any) => {
            //     handleCallBack(f);
            //   }}
            // />
            <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
              <Drawer.Screen
                name={`${appJson.modules[moduleObject].moduleName}Home`}
                options={{
                  title: `${appJson.modules[moduleObject].moduleName}Home`,
                  headerShown: false,
                }}
              >
                {(e) => (
                  <ModuleIndex
                    {...e}
                    moduleName={appJson.modules[moduleObject].moduleName}
                  />
                )}
              </Drawer.Screen>

              {Object.keys(appJson.modules[moduleObject].pages).map((page) => (
                <Drawer.Screen
                  key={appJson.modules[moduleObject].pages[page].pageName}
                  name={appJson.modules[moduleObject].pages[page].pageName}
                  options={{
                    title: appJson.modules[moduleObject].pages[page].pageName,
                    headerShown: false,
                  }}
                >
                  {(e) => (
                    <ModuleForm
                      {...e}
                      formParam={
                        appJson.modules[moduleObject].pages[page].components
                      }
                      formMode="register"
                      callFather={(value: any, field: any) => {
                        handleCallBack(moduleObject, page, field, value);
                      }}
                    />
                  )}
                </Drawer.Screen>
              ))}
            </Drawer.Navigator>
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
}
