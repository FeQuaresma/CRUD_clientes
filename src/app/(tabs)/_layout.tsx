import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from ".";
import Calculator from "./calc";
import { modulesParam } from "@/src/constants/moduleParam";
import ModuleForm from "@/src/components/moduleForm";
import ModuleIndex from "@/src/components/moduleIndex";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ModuleParam, modulesParamV2 } from "@/src/constants/moduleParamV2";
import { executeFunction } from "@/src/functions/executeJsonFunctions";

export interface FunctionJson {
  functionCode: string;
  importedFunc: { [key: string]: { import: string; from: string } };
}
const Drawer = createDrawerNavigator();

export default function MyApp() {
  const [appJson, setAppJson] = useState<ModuleParam>(modulesParamV2);

  const funcJsonTemp = `console.log("primeira flag");

  const newRow = [{
numero: appJson.modules.pedido.pages.cadastro.components.numero.value,
item: appJson.modules.pedido.pages.cadastro.components.item.value,
quantidade: appJson.modules.pedido.pages.cadastro.components.quantidade.value,
}];

console.log("segunda flag");

setAppJson((prevForm) => ({
...prevForm,
modules: {
...prevForm.modules,
pedido: {
...prevForm.modules.pedido,
pages: {
...prevForm.modules.pedido.pages,
cadastro: {
...prevForm.modules.pedido.pages.cadastro,
components: {
...prevForm.modules.pedido.pages.cadastro.components,
tableNomeProprio: {
...prevForm.modules.pedido.pages.cadastro.components.table,
table: {
  ...prevForm.modules.pedido.pages.cadastro.components.table.table,
  dataOrigin: prevForm.modules.pedido.pages.cadastro.components.table.table.dataOrigin.concat(newRow),
  dataTable: prevForm.modules.pedido.pages.cadastro.components.table.table.dataTable.concat(newRow),
},
},
},
},
},
},
},
}));
  console.log("terceira Flag");
`;

const funcJsonTemp2 = `console.log("primeira flag");
const newRow = {
numero: appJson.modules.pedido.pages.cadastro.components.numero.value,
item: appJson.modules.pedido.pages.cadastro.components.item.value,
quantidade: appJson.modules.pedido.pages.cadastro.components.quantidade.value,
};
console.log("segunda flag");
console.log({...appJson.modules.pedido.pages.cadastro.components.table.table.dataTable,...newRow})
console.log("terceira Flag");
`;

  function handleCallBackTable(
    moduleObject: any,
    page: any,
    field: any,
    value: any,
    whichTable: any
  ) {
    switch (whichTable) {
      case "Origin":
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
                      table: {
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field].table,
                        dataOrigin: prevForm.modules[moduleObject].pages[page]
                        .components[field].table?.dataOrigin?.concat(value),
                        dataTable: prevForm.modules[moduleObject].pages[page]
                        .components[field].table?.dataTable?.concat(value),
                      },
                    },
                  },
                },
              },
            },
          },
        }));
        break;
      case "Table":
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
                      table: {
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field].table,
                        dataTable: value,
                      },
                    },
                  },
                },
              },
            },
          },
        }));
        break;
    }
  }

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
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field],
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
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field],
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
                        ...prevForm.modules[moduleObject].pages[page]
                          .components[field].value,
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
                        ...prevForm.modules[moduleObject].pages[page]
                          .components,
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
  }

  function handleCallBackButton(moduleObject: any, page: any, field: any) {


    const funcCode =
      appJson.modules[moduleObject].pages[page].components[field]?.function
        ?.functionCode;

    if (funcCode) {
      // Se houver função, executa
      executeFunction(funcJsonTemp, appJson, setAppJson);
    } else {
      console.error("No functionCode found in the component.");
    }
  }

  async function executeFunction(
    jsonImported: string,
    appJson: any,
    setAppJson: any
  ) {
    try {
      // Criar e executar a função dinamicamente
      const func = new Function("appJson", "setAppJson", jsonImported);
      console.log("Executing Function: ", func.toString());
      func(appJson, setAppJson);
    } catch (error) {
      console.error("Error executing functionCode: ", error);
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
                      callFatherTable={(
                        value: any,
                        field: any,
                        whichTable: string
                      ) => {
                        handleCallBackTable(
                          moduleObject,
                          page,
                          field,
                          value,
                          whichTable
                        );
                      }}
                      callFatherButton={(field: any) => {
                        handleCallBackButton(moduleObject, page, field);
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
