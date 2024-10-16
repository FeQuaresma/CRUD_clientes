import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModuleForm from "@/src/components/moduleForm";
import { ModuleParam, modulesParamV2 } from "@/src/constants/moduleParamV2";
import ModuleIndex from "@/src/components/moduleIndex";
import { enter8 } from "@/src/functions/enter8";
import * as cssjson from "cssjson";
import Log from "./log";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FunctionJson {
  functionCode: string;
  importedFunc: { [key: string]: { import: string; from: string } };
}

export interface Location {
  module: string;
  page: string;
  field: string;
}
const Drawer = createDrawerNavigator();

export default function MyApp() {
  const [appJson, setAppJson] = useState<ModuleParam>(modulesParamV2);
  let consoleMessages = "";



  useEffect(() => {
    captureConsoleMessages();
    setAppJson((prevForm: ModuleParam) => ({
      ...prevForm,
      ...enter8,
      setField,
      getClassCss,
      setClassCss,
      class: {
        ...prevForm.class,
        ...cssReader(),
      },
    }));
  }, []);

  useEffect(()=>{
    console.log(appJson)
    // storeData(appJson)
    // console.log(getData())
  },[appJson])

  async function storeData(value:any) {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue)
      // await AsyncStorage.setItem('myAppJson', jsonValue);
    } catch (e) {
      console.error(e)
    }
  };

  async function getData(): Promise<ModuleParam> {
    try {
      const jsonValue = await AsyncStorage.getItem('myAppJson');
      return jsonValue != null ? JSON.parse(jsonValue) : modulesParamV2;
    } catch (e) {
      console.error(e)
      return modulesParamV2;
    }
  }

  function getClassCss(
    id: string | string[],
    appJsonRefreshed: ModuleParam
  ): string | string[] {
    let classList: any[] = [];

    function processClass(idString: string) {
      let idArray = idString.split(".");

      if (
        appJsonRefreshed.modules[idArray[0]].pages[idArray[1]].components[
          idArray[2]
        ]
      ) {
        classList.push(
          appJsonRefreshed.modules[idArray[0]].pages[idArray[1]].components[
            idArray[2]
          ].class
        );
      }
    }

    if (typeof id === "string") {
      processClass(id);
    } else if (typeof id === "object") {
      id.forEach((idIndex) => {
        processClass(idIndex);
      });
    }
    return classList.length > 1 ? classList : classList[0];
  }

  function setClassCss(id: string | string[], classes: string | string[]) {
    function processClass(idString: string, classString: string) {
      let idArray = idString.split(".");
      setAppJson((prevForm: ModuleParam) => ({
        ...prevForm,
        modules: {
          ...prevForm.modules,
          [idArray[0]]: {
            ...prevForm.modules[idArray[0]],
            pages: {
              ...prevForm.modules[idArray[0]].pages,
              [idArray[1]]: {
                ...prevForm.modules[idArray[0]].pages[idArray[1]],
                components: {
                  ...prevForm.modules[idArray[0]].pages[idArray[1]].components,
                  [idArray[2]]: {
                    ...prevForm.modules[idArray[0]].pages[idArray[1]]
                      .components[idArray[2]],
                    class: classString,
                  },
                },
              },
            },
          },
        },
      }));
    }
    if (typeof id === "string") {
      id = [id];
    }
    if (typeof classes === "string") {
      id.forEach((_, i) => {
        processClass(id[i], classes);
      });
    } else {
      id.forEach((_, i) => {
        if (classes[i]) {
          processClass(id[i], classes[i]);
        }
      });
    }
  }

  function cssReader() {
    if (appJson.classString) {
      let css = "";
      for (let i = 0; i < appJson.classString.length; i++) {
        css += appJson.classString[i] + "\n";
      }

      const cssObj = cssjson.toJSON(css).children;
      const newCss: any = {};

      Object.keys(cssObj).forEach((className) => {
        Object.keys(cssObj[className].attributes).forEach((attribute) => {
          if (!isNaN(Number(cssObj[className].attributes[attribute]))) {
            cssObj[className].attributes[attribute] = Number(
              cssObj[className].attributes[attribute]
            );
          }
        });
        let cleanClassName = className.substring(1);
        newCss[cleanClassName] = cssObj[className].attributes;
      });
      // console.log(newCss);
      return newCss;
    } else {
      return {};
    }
  }

  function setField(setFieldObj: any) {
    Object.keys(setFieldObj).forEach((modName: any) => {
      if (modName === "css") {
        setAppJson((prevForm: ModuleParam) => ({
          ...prevForm,
          style: { ...prevForm.style, ...setFieldObj[modName] },
        }));
      } else if (appJson.modules[modName]) {
        Object.keys(setFieldObj[modName]).forEach((pageName: any) => {
          if (pageName === "css") {
            setAppJson((prevForm: ModuleParam) => ({
              ...prevForm,
              modules: {
                ...prevForm.modules,
                [modName]: {
                  ...prevForm.modules[modName],
                  style: {
                    ...prevForm.modules[modName].moduleSettings,
                    ...setFieldObj[modName][pageName],
                  },
                },
              },
            }));
          } else if (appJson.modules[modName].pages[pageName]) {
            Object.keys(setFieldObj[modName][pageName]).forEach(
              (fieldName: any) => {
                if (fieldName === "css") {
                  setAppJson((prevForm: ModuleParam) => ({
                    ...prevForm,
                    modules: {
                      ...prevForm.modules,
                      [modName]: {
                        ...prevForm.modules[modName],
                        pages: {
                          ...prevForm.modules[modName].pages,
                          [pageName]: {
                            ...prevForm.modules[modName].pages[pageName],
                            style: {
                              ...prevForm.modules[modName].pages.style,
                              ...setFieldObj[modName][pageName][fieldName],
                            },
                          },
                        },
                      },
                    },
                  }));
                } else if (
                  appJson.modules[modName].pages[pageName].components[fieldName]
                ) {
                  Object.keys(
                    setFieldObj[modName][pageName][fieldName]
                  ).forEach((propName: any) => {
                    setAppJson((prevForm: ModuleParam) => ({
                      ...prevForm,
                      modules: {
                        ...prevForm.modules,
                        [modName]: {
                          ...prevForm.modules[modName],
                          pages: {
                            ...prevForm.modules[modName].pages,
                            [pageName]: {
                              ...prevForm.modules[modName].pages[pageName],
                              components: {
                                ...prevForm.modules[modName].pages[pageName]
                                  .components,
                                [fieldName]: {
                                  ...prevForm.modules[modName].pages[pageName]
                                    .components[fieldName],
                                  [propName]:
                                    setFieldObj[modName][pageName][fieldName][
                                      propName
                                    ],
                                },
                              },
                            },
                          },
                        },
                      },
                    }));
                  });
                } else {
                  console.error(
                    `${modName}.${pageName}.${fieldName} not found`
                  );
                }
              }
            );
          } else {
            console.error(`${modName}.${pageName} not found`);
          }
        });
      } else {
        console.error(`${modName} not found`);
      }
    });
  }

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
                        dataOrigin:
                          prevForm.modules[moduleObject].pages[page].components[
                            field
                          ].table?.dataOrigin?.concat(value),
                        dataTable:
                          prevForm.modules[moduleObject].pages[page].components[
                            field
                          ].table?.dataTable?.concat(value),
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
      case "Remove":
        console.log(value);
        let newArray: any =
          appJson.modules[moduleObject].pages[page].components[field].table
            ?.dataTable;
        newArray.splice(value, 1);
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
                        dataOrigin: newArray,
                        dataTable: newArray,
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
    if (value || value === "") {
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
    if (appJson.modules[moduleObject].pages[page].components[field].function) {
      const location: Location = {
        module: moduleObject,
        page: page,
        field: field,
      };
      // Se houver função, executa
      executeFunction(
        appJson.modules[moduleObject].pages[page].components[field].function,
        location
      );
    } else {
      console.error("No functionCode found in the component.");
    }
  }

  async function executeFunction(jsonImported: string, location: Location) {
    try {
      appJson.modules[location.module].funcNames?.forEach((fnName:string) => {
        const regex = new RegExp(`\\b${fnName}\\((.*?)\\)`, "g");
        jsonImported = jsonImported.replace(regex, (_, group1) => {
          // Verifica se o primeiro grupo de captura (os parâmetros) está vazio
          if (group1.trim() === "") {
            // Se vazio, retorna a substituição sem parâmetros adicionais
            return `appJson.modules.${location.module}.functions.${fnName}(appJson)`;
          } else {
            // Caso contrário, insere os parâmetros capturados e o appJson
            return `appJson.modules.${location.module}.functions.${fnName}(${group1}, appJson)`;
          }
        });
      });

      Object.keys(appJson).forEach((fnName: any) => {
        const regex = new RegExp(`\\bappJson\\.${fnName}\\((.*?)\\)`, "g");
        if (jsonImported.match(regex)) {
          jsonImported = jsonImported.replace(
            regex,
            `appJson.${fnName}($1, appJson)`
          );
        }
      });

      appJson.modules[location.module].varNames?.forEach((varName:string) => {
        const regex = new RegExp(`\\b${varName}\\b`, "g");
        if (jsonImported.match(regex)) {
          jsonImported = jsonImported.replace(
            regex,
            `appJson.modules.${location.module}.variables.${varName}`
          );
        }
      });

      const func = new Function("appJson", "location", jsonImported);
      func(appJson, location);
    } catch (e) {
      console.error(e);
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

  function openLog() {
    setAppJson((prevForm: ModuleParam) => ({
      ...prevForm,
      console: {
        ...prevForm.console,
        isVisible: !prevForm.console.isVisible,
      },
    }));
  }

  const captureConsoleMessages = () => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Sobrescrevendo console.log
    console.log = function (...args) {
      consoleMessages += appJson.console.log + "[LOG] " + args.join(" ") + "\n";

      setAppJson((prevForm: ModuleParam) => ({
        ...prevForm,
        console: {
          ...prevForm.console,
          log: consoleMessages,
        },
      }));

      originalLog.apply(console, args); // Chama o console.log original
    };

    // Sobrescrevendo console.warn
    console.warn = function (...args) {
      consoleMessages +=
        appJson.console.log + "[WARN] " + args.join(" ") + "\n";

      setAppJson((prevForm: ModuleParam) => ({
        ...prevForm,
        console: {
          ...prevForm.console,
          log: consoleMessages,
        },
      }));

      originalWarn.apply(console, args); // Chama o console.warn original
    };

    // Sobrescrevendo console.error
    console.error = function (...args) {
      consoleMessages +=
        appJson.console.log + "[ERROR] " + args.join(" ") + "\n";

      setAppJson((prevForm: ModuleParam) => ({
        ...prevForm,
        console: {
          ...prevForm.console,
          log: consoleMessages,
        },
      }));

      originalError.apply(console, args); // Chama o console.error original
    };
  };

  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        drawerStyle: { borderColor: "red", borderWidth: 1 },
        drawerContentStyle: { borderColor: "blue", borderWidth: 1 },
        drawerContentContainerStyle: { borderColor: "blue", borderWidth: 1, flex: 1 }
      }}
    >
      {Object.keys(appJson.modules).map((moduleObject) => (
        <Drawer.Screen
          key={moduleObject}
          name={moduleObject}
          options={{
            title: appJson.modules[moduleObject].moduleName,
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
                    appJson={appJson}
                    moduleObject={moduleObject}
                    setAppJson={setAppJson}
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
                      openLog={openLog}
                      consoleRN={appJson.console}
                      pageSettings={
                        appJson.modules[moduleObject].pages[page].pageSettings
                      }
                      formName={
                        appJson.modules[moduleObject].pages[page].pageName
                      }
                      formParam={
                        appJson.modules[moduleObject].pages[page].components
                      }
                      classes={appJson.class}
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

      <Drawer.Screen
        name="LOG"
        options={{
          title: "LOG",
          headerShown: false,
          drawerActiveBackgroundColor: "green",
          drawerActiveTintColor: "white",
          drawerLabelStyle: {color: "black"},
          drawerItemStyle: { position: "absolute", bottom: 1, width: 250, alignSelf: "center"},
        }}
      >
        {(e: any) => <Log {...e} logString={appJson.console.log} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
