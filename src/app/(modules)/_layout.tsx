import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModuleForm from "@/src/components/moduleForm";
import { ModuleParam, modulesParamV2 } from "@/src/constants/moduleParamV2";
import ModuleIndex from "@/src/components/moduleIndex";
import { enter8 } from "@/src/functions/enter8";
import * as cssjson from "cssjson";

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

  useEffect(() => {
    setAppJson((prevForm: ModuleParam) => ({
      ...prevForm,
      ...enter8,
      setField,
      class: {
        ...prevForm.class,
        ...cssReader(),
      },
    }));
  }, []);

  useEffect(()=>{
    console.log(appJson.class)
  },[appJson.class])

  // function setField(
  //   moduleName: string,
  //   page: string,
  //   field: string,
  //   param: string[],
  //   value: any[]
  // ) {
  //   for (let i = 0; i < param.length; i++) {
  //     setAppJson((prevForm: ModuleParam) => ({
  //       ...prevForm,
  //       modules: {
  //         ...prevForm.modules,
  //         [moduleName]: {
  //           ...prevForm.modules[moduleName],
  //           pages: {
  //             ...prevForm.modules[moduleName].pages,
  //             [page]: {
  //               ...prevForm.modules[moduleName].pages[page],
  //               components: {
  //                 ...prevForm.modules[moduleName].pages[page].components,
  //                 [field]: {
  //                   ...prevForm.modules[moduleName].pages[page].components[
  //                     field
  //                   ],
  //                   [param[i]]: value[i],
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     }));
  //   }
  // }

  function cssReader() {
    const css = `

    .button {
    width: 250;
    backgroundColor: #007aff;
    padding: 10;
    borderRadius: 5;
    marginTop: 10;
    justifyContent: center;
    alignItems: center;
    textAlign: center;
    color: #ffffff;
    fontSize: 20;
    fontWeight: bold;
  }

/* Classe 1 */
#classe1 {
  background-color: #FF5733;
  font-size: 16px;
  margin: 10px;
}

/* Classe 2 */
.classe2 {
  color: #2ECC71;
  padding: 20px;
  border: 2px solid #000;
}

/* Classe 3 */
.classe3 {
  text-align: center;
  font-weight: bold;
  line-height: 1.5;
}

/* Classe 4 */
.classe4 {
  background-image: url('imagem.jpg');
  opacity: 0.8;
  height: 100vh;
}

/* Classe 5 */
.classe5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Classe 6 */
.classe6 {
  position: absolute;
  top: 50px;
  left: 100px;
}

/* Classe 7 */
.classe7 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: all 0.3s ease;
}

/* Classe 8 */
.classe8 {
  overflow: hidden;
  cursor: pointer;
  z-index: 999;
}

/* Classe 9 */
.classe9 {
  list-style: none;
  text-decoration: underline;
  letter-spacing: 2px;
}

/* Classe 10 */
.classe10 {
  filter: grayscale(100%);
  transform: rotate(45deg);
  width: 200px;
}
`;

    const cssObj = cssjson.toJSON(css).children;
    const newCss: any = {};

    Object.keys(cssObj).forEach((className) => {
      let cleanClassName = className.substring(1);
      newCss[cleanClassName] = cssObj[className].attributes;
    });
    return newCss;
  }

  function setField(setFieldObj: any) {
    Object.keys(setFieldObj).forEach((modName) => {
      if (modName === "css") {
        setAppJson((prevForm: ModuleParam) => ({
          ...prevForm,
          css: { ...prevForm.css, ...setFieldObj[modName] },
        }));
      } else if (setFieldObj[modName]) {
        Object.keys(setFieldObj[modName]).forEach((pageName) => {
          if (pageName === "css") {
            setAppJson((prevForm: ModuleParam) => ({
              ...prevForm,
              modules: {
                ...prevForm.modules,
                [modName]: {
                  ...prevForm.modules[modName],
                  css: {
                    ...prevForm.modules[modName].css,
                    ...setFieldObj[modName][pageName],
                  },
                },
              },
            }));
          } else if (setFieldObj[modName][pageName]) {
            Object.keys(setFieldObj[modName][pageName]).forEach((fieldName) => {
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
                          css: {
                            ...prevForm.modules[modName].pages.css,
                            ...setFieldObj[modName][pageName][fieldName],
                          },
                        },
                      },
                    },
                  },
                }));
              } else if (setFieldObj[modName][pageName][fieldName]) {
                Object.keys(setFieldObj[modName][pageName][fieldName]).forEach(
                  (propName) => {
                    if (setFieldObj[modName][pageName][fieldName][propName]) {
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
                    } else {
                      console.error(
                        `${modName}.${pageName}.${fieldName}.${propName} not found`
                      );
                    }
                  }
                );
              } else {
                console.error(`${modName}.${pageName}.${fieldName} not found`);
              }
            });
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
    const itemsArray: any[] = [];
    const itemsKeys: any[] = [];

    try {
      appJson.modules[location.module].funcNames?.forEach((fnName) => {
        const regex = new RegExp(`\\b${fnName}\\((.*?)\\)`, "g");
        if (jsonImported.match(regex)) {
          jsonImported = jsonImported.replace(
            regex,
            `appJson.modules.${location.module}.functions.${fnName}($1, appJson)`
          );
        }
      });

      appJson.modules[location.module].varNames?.forEach((varName) => {
        const regex = new RegExp(`\\b${varName}\\((.*?)\\)`, "g");
        if (jsonImported.match(regex)) {
          jsonImported = jsonImported.replace(
            regex,
            `appJson.modules.${location.module}.variables.${varName}`
          );
        }
      });

      const func = new Function(
        ...itemsKeys,
        "appJson",
        "location",
        clearFunctionString(jsonImported, location.module)
      );

      func(...itemsArray, appJson, location);
    } catch (e) {
      console.error(e);
    }
  }

  function clearFunctionString(funcString: string, moduleName: string) {
    if (appJson.modules.cliente.functions) {
      Object.keys(appJson.modules.cliente.functions).forEach((fnName: any) => {
        const regex = new RegExp(`\\b${fnName}\\b`, "g");
        if (funcString.match(regex)) {
          funcString = funcString.replace(
            regex,
            `appJson.modules.${moduleName}.functions.${fnName}`
          );
        }
      });
    }
    if (appJson.modules.cliente.variables) {
      Object.keys(appJson.modules.cliente.variables).forEach((varName: any) => {
        const regex = new RegExp(`\\b${varName}\\b`, "g");
        if (funcString.match(regex)) {
          funcString = funcString.replace(
            regex,
            `appJson.modules.${moduleName}.variables.${varName}`
          );
        }
      });
    }
    return funcString;
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
      {/* <Drawer.Screen
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
            setAppJson={() => {
              setAppJson(appJsonOrigin);
              console.log("Refreshed!");
            }}
          />
        )}
      </Drawer.Screen>
       */}

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
    </Drawer.Navigator>
  );
}
