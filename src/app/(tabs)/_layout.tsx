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
    value?: any,
    fillForm?: any,
    errorMsg?: any,
    dateOrder?: string
  ) {
    if (value) {
      handleInputChange(moduleObject, page, field, value, fillForm, errorMsg, dateOrder);
    }
  }

  function handleInputChange(
    moduleObject: any,
    page: any,
    field: any,
    value?: any,
    fillForm?: any,
    errorMsg?: any,
    dateOrder?: string
  ) {
    // Máscara de input
    if (appJson.modules[moduleObject].pages[page].components[field].masks) {
      if (
        appJson.modules[moduleObject].pages[page].components[field].zeroTrim
      ) {
        value = value.replace(/\D/g, "").replace(/^0+/, "");
      } else {
        value = value.replace(/\D/g, "");
      }
      let eMasked = maskedValue(
        value,
        appJson.modules[moduleObject].pages[page].components[field].masks
      );

      if (dateOrder) {
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
                      valueMasked: {
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field],
                        [dateOrder]: eMasked,
                      },
                    },
                  },
                },
              },
            },
          },
        }));
      } else {
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
                      valueMasked: eMasked,
                    },
                  },
                },
              },
            },
          },
        }));
        value = value.replace(/\D/g, "");
      }
    }

    //inserir dados no input

    if (dateOrder) {
      setAppJson((prevForm: any) => ({
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
                    value: {
                      ...prevForm.modules[moduleObject].pages[page].components[
                        field
                      ].value,
                      [dateOrder]: value,
                    },
                  },
                },
              },
            },
          },
        },
      }));
    } else {
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

    // prenchimento automatico de campos
    if (fillForm) {
      Object.keys(fillForm).map((formField) => {
        if (appJson.modules[moduleObject].pages[page].components[formField]) {
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
                      [formField]: {
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[formField],
                        value: value,
                      },
                    },
                  },
                },
              },
            },
          }));
        }
      });
    }

    // inserir uma mensagem vermelha acima do input
    if (
      appJson.modules[moduleObject].pages[page].components[field].errorMsg !=
      undefined
    ) {
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
                    errorMsg: errorMsg,
                  },
                },
              },
            },
          },
        },
      }));
    }
  }

  function maskedValue(value: string, mask: any) {
    // value = value.replace(/\D/g, "").replace(/^0+/, "") || "";
    value = value.replace(/\D/g, "") || "";
    for (let i = 0; i < mask.length; i++) {
      if (value.length >= mask[i][2]) {
        value = value.replace(mask[i][0], mask[i][1]);
        break;
      }
    }
    while (/[^\w\s]$/.test(value)) {
      value = value.slice(0, -1);
    }
    return value;
  }

  function maskedValueDate(dataObject: any, mask: any) {
    let dataObjectTemp = dataObject;
    Object.keys(dataObjectTemp).forEach((key) => {
      if (dataObjectTemp[key] !== "") {
        dataObjectTemp[key] = dataObjectTemp[key]
          .replace(/\D/g, "")
          .replace(mask[0], mask[1]);
      }
    });

    return dataObjectTemp;
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
        {(e: any) => <Home {...e} appJson={appJson} />}
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
                      setFormParam={setAppJson}
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
