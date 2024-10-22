import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModuleForm from "@/src/components/moduleForm";
import ModuleIndex from "@/src/components/moduleIndex";
import { enter8 } from "@/src/functions/enter8";
import * as cssjson from "cssjson";
import Log from "./log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  catchTextJs,
  extractFunctions,
} from "@/src/functions/extractFunctions";
import { Location } from "@/src/interfaces";
import { ModuleParam } from "@/src/types";

// Acessa o navegador em formato de gaveta, que é o principal
const Drawer = createDrawerNavigator();

/**
 * Função que guarda o parâmetro recebido no armazenamento interno.
 * @param {ModuleParam} value - O valor a ser salvo.
 * @returns {Promise<void>} Retorna uma promessa que salva o estado no AsyncStorage.
 */
export async function storeData(value: ModuleParam) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("myAppJson", jsonValue);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Componente principal da aplicação.
 * @param {ModuleParam} appJson - O estado atual da aplicação, contendo os módulos e componentes.
 * @param {React.Dispatch<React.SetStateAction<ModuleParam>>} setAppJson - Função para atualizar o estado da aplicação.
 * @returns {JSX.Element} Retorna o componente da aplicação principal com o Drawer Navigator.
 */
export default function MyApp({
  appJson,
  setAppJson,
}: {
  appJson: ModuleParam;
  setAppJson: React.Dispatch<React.SetStateAction<ModuleParam>>;
}) {
  // Efeito colateral para sobrescrever os consoles padrão (log, warn, error) ao iniciar o aplicativo
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    /** @type {string} */
    let consoleMessages = "";

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

    // Atualiza o appJson com funções adicionais e CSS processado
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

    // Chama a função que gerencia as funções internas dos módulos
    Object.keys(appJson.modules).forEach((moduleObject) => {
      if (appJson.modules[moduleObject].stringFunctions) {
        functionList(moduleObject);
      }
    });
  }, []);

  // Atualiza o armazenamento interno a cada modificação no estado appJson
  useEffect(() => {
    storeData(appJson);
  }, [appJson]);

  /**
   * Processa as funções de um módulo e adiciona ao estado da aplicação.
   * @param {string} moduleObject - O nome do módulo a ser processado.
   * @returns {Promise<void>} Retorna uma promessa que processa as funções do módulo.
   */
  async function functionList(moduleObject: string) {
    const itemsObj = await createStringFunc(moduleObject);
    const functions: { [key: string]: any } = {};
    itemsObj?.functions.forEach((functionArray: any) => {
      const func = new Function(...functionArray[1], functionArray[2]);
      functions[functionArray[0]] = (...args: any[]) => func(...args);
    });
    setAppJson((prevForm: ModuleParam) => ({
      ...prevForm,
      modules: {
        ...prevForm.modules,
        [moduleObject]: {
          ...prevForm.modules[moduleObject],
          functions: functions,
          variables: itemsObj?.variables,
          varNames: itemsObj?.varNames,
          funcNames: itemsObj?.funcNames,
        },
      },
    }));
  }

  async function createStringFunc(moduleObject: string) {
    let finalString = "";

    // Verifica se o objeto e suas propriedades existem
    if (
      appJson.modules[moduleObject] &&
      appJson.modules[moduleObject].stringFunctions
    ) {
      for (
        let i = 0;
        i < appJson.modules[moduleObject].stringFunctions.length;
        i++
      ) {
        const stringFunc = appJson.modules[moduleObject].stringFunctions[i];

        if (isValidUrl(stringFunc)) {
          const result = await catchTextJs(stringFunc); // Aguarda o retorno do fetch
          finalString += result; // Concatena o resultado da função teste
        } else {
          finalString += stringFunc + "\n";
        }
      }
    } else {
      console.error(
        `Módulo ${moduleObject} ou stringFunctions não está definido`
      );
    }

    return extractFunctions(finalString, moduleObject);
  }

  function isValidUrl(e: string) {
    try {
      new URL(e);
      return true;
    } catch (_) {
      return false;
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

  function setCrypto(modName: any, pageName: any, fieldName: any, value: any) {
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
                ...prevForm.modules[modName].pages[pageName].components,
                [fieldName]: {
                  ...prevForm.modules[modName].pages[pageName].components[
                    fieldName
                  ],
                  crypto: value,
                },
              },
            },
          },
        },
      },
    }));
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
      appJson.modules[location.module].funcNames?.forEach((fnName: string) => {
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

      appJson.modules[location.module].varNames?.forEach((varName: string) => {
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

  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        drawerStyle: { borderColor: "red", borderWidth: 1 },
        drawerContentStyle: { borderColor: "blue", borderWidth: 1 },
        drawerContentContainerStyle: {
          borderColor: "blue",
          borderWidth: 1,
          flex: 1,
        },
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
                      setCrypto={(value: any, field: any) => {
                        setCrypto(moduleObject, page, field, value);
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
          drawerLabelStyle: { color: "black" },
          drawerItemStyle: {
            position: "absolute",
            bottom: 1,
            width: 250,
            alignSelf: "center",
          },
        }}
      >
        {(e: any) => <Log {...e} logString={appJson.console.log} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
