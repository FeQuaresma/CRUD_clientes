import { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Date,
  Select,
  File,
  Input,
  MultiSelect,
  Boolean,
  TextBox,
  Grid,
  Table,
  Image,
  Button,
  Text as TextPortal8,
  // Video,
  Sound,
} from "./fields";
import { styles } from "../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sumClass } from "../functions/sumClass";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Drawer } from "../app/modules/_layout";

const Tab = createMaterialTopTabNavigator();

export default function ModuleForm({
  pageSettings,
  formParam,
  formMode,
  navigation,
  route,
  callFather,
  callFatherTable,
  callFatherButton,
  setToken,
  setFormParam,
  formName,
  classes,
  consoleRN,
  openLog,
}: any) {
  const [tabSet, setTabSet] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<boolean>(false);
  const [tabGroups, setTabGroups] = useState<{
    [key: string]: { [key: string]: number };
  }>({});

  function adicionarElemento(elemento: string) {
    setTabSet((prevSet) => new Set(prevSet).add(elemento));
  }

  useEffect(() => {
    Object.keys(formParam).forEach((componentName) => {
      adicionarElemento(formParam[componentName].group.name);
    });
  }, []);

  useEffect(() => {
    Array.from(tabSet).forEach((group) => {
      let tempGroup: any = {};
      Object.keys(formParam).forEach((component) => {
        if (formParam[component].group.name === group) {
          tempGroup[component] = formParam[component].group.position;
        }
      });
      // Atualize o estado de tabGroups acumulando os grupos
      setTabGroups((prevGroups) => ({
        ...prevGroups,
        [group]: tempGroup,
      }));
    });
    setLoaded(true);
  }, [tabSet]);

  useEffect(() => {
    handleFilterCallBack(route.params);
  }, [route.params]);

  function handleModal() {
    for (const field of Object.keys(formParam)) {
      if (formParam[field].errorMsg != "") {
        return false;
      }
    }
    return true;
  }

  function dateInput(field: string) {
    switch (formMode) {
      case "filter":
        return (
          <View>
            <Date
              field={formParam[field]}
              dateOrder="start"
              classes={classes}
              onValueChange={(e: any, type: any) =>
                handleInputChange(e, field, undefined, undefined, type)
              }
            />
            <Date
              field={formParam[field]}
              dateOrder="end"
              classes={classes}
              onValueChange={(e: any, type: any) => {
                handleInputChange(e, field, undefined, undefined, type);
              }}
            />
          </View>
        );
      case "register":
        return (
          <Date
            field={formParam[field].value}
            classes={classes}
            onValueChange={(e: any) => handleInputChange(e, field)}
          />
        );
      case "default":
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

  function handleInputChange(
    e: any,
    field: string,
    fillForm?: any,
    errorMsg?: any,
    dateOrder?: string
  ) {
    // Máscara de input
    if (formParam[field].masks) {
      if (formParam[field].zeroTrim) {
        e = e.replace(/\D/g, "").replace(/^0+/, "");
      } else {
        e = e.replace(/\D/g, "");
      }
      let eMasked = maskedValue(e, formParam[field].masks);

      if (dateOrder) {
        setFormParam((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            valueMasked: {
              ...prevForm[field].valueMasked,
              [dateOrder]: eMasked,
            },
          },
        }));
      } else {
        setFormParam((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            valueMasked: eMasked,
          },
        }));
        e = e.replace(/\D/g, "");
      }
    }

    //inserir dados no input

    if (dateOrder) {
      setFormParam((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          value: {
            ...prevForm[field].value,
            [dateOrder]: e,
          },
        },
      }));
    } else {
      setFormParam((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          value: e,
        },
      }));
    }

    // prenchimento automatico de campos
    if (fillForm) {
      Object.keys(fillForm).map((formField) => {
        if (formParam[formField]) {
          setFormParam((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],
              value: fillForm[formField],
            },
          }));
        }
      });
    }

    // inserir uma mensagem vermelha acima do input
    if (formParam[field].errorMsg != undefined) {
      setFormParam((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          errorMsg: errorMsg,
        },
      }));
    }
  }

  function handleFilterNavigation() {
    let formData: any = {};
    let colVisibility: string[] = [];

    Object.keys(formParam).map((key) => {
      let value = formParam[key].value;
      formParam[key].isCurrency && (value = (value / 100).toFixed(2));
      if (formParam[key].value !== "" && formParam[key].inputType !== "date") {
        if (formParam[key].searchSign) {
          switch (formParam[key].searchSign) {
            case "equals":
              formData[key] = value;
              break;
            case "greater-than":
              formData[key] = ">" + value;
              break;
            case "less-than":
              formData[key] = "<" + value;
              break;
          }
        } else {
          formData[key] = value;
        }
      }

      if (formParam[key].inputType === "date") {
        if (
          !(
            typeof value === "object" &&
            !(value.end !== "" || value.start !== "")
          )
        ) {
          formData[key] = {
            start: value.start
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d{2})(\d{4})$/, "$3-$2-$1"),
            end: value.end
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d{2})(\d{4})$/, "$3-$2-$1"),
          };
        } else if (typeof value === "string" && value !== "") {
          formData[key] = value.replace(/^(\d{2})(\d{2})(\d{4})$/, "$3-$2-$1");
        }
      }

      if (!formParam[key].isVisible) {
        colVisibility.push(key);
      }
    });

    navigation.navigate("ModuleList", { formData, colVisibility });
  }

  function handleFilterCallBack(fillForm: any) {
    if (fillForm?.formData) {
      Object.keys(fillForm.formData).map((formField) => {
        if (formParam[formField].inputType === "date") {
          setFormParam((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],

              value: maskedValueDate(
                fillForm.formData[formField],
                formParam[formField].callbackMask
              ),
              valueMasked: maskedValueDate(
                fillForm.formData[formField],
                formParam[formField].masks[0]
              ),
            },
          }));
        } else if (formParam[formField].searchSign) {
          let cleanValue = fillForm.formData[formField].replace(/\D/g, "");

          switch (fillForm.formData[formField][0]) {
            case ">":
              setFormParam((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(
                    cleanValue,
                    formParam[formField].masks
                  ),
                  searchSign: "greater-than",
                },
              }));
              break;
            case "<":
              setFormParam((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(
                    cleanValue,
                    formParam[formField].masks
                  ),
                  searchSign: "less-than",
                },
              }));
              break;
            default:
              setFormParam((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(
                    cleanValue,
                    formParam[formField].masks
                  ),
                  searchSign: "equals",
                },
              }));
              break;
          }
        } else if (formParam[formField]) {
          setFormParam((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],
              value: fillForm.formData[formField],
            },
          }));
        }
      });
    }
    if (fillForm?.colVisibility) {
      Object.keys(formParam).forEach((key) => {
        if (fillForm.colVisibility.includes(key)) {
          setFormParam((prevForm: any) => ({
            ...prevForm,
            [key]: {
              ...prevForm[key],
              isVisible: false,
            },
          }));
        } else {
          setFormParam((prevForm: any) => ({
            ...prevForm,
            [key]: {
              ...prevForm[key],
              isVisible: true,
            },
          }));
        }
      });
    }
  }

  function handleVisibilityChange(field: string) {
    if (formParam[field].isVisible) {
      setFormParam((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          isVisible: false,
        },
      }));
    } else {
      setFormParam((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          isVisible: true,
        },
      }));
    }
  }

  function handleResetFormParam() {
    setFormParam(formParam);
  }

  function onChangeSign(field: any) {
    let changeTo = "";

    switch (formParam[field].searchSign) {
      case "equals":
        changeTo = "greater-than";
        break;
      case "greater-than":
        changeTo = "less-than";
        break;
      case "less-than":
        changeTo = "equals";
        break;
    }

    setFormParam((prevForm: any) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        searchSign: changeTo,
      },
    }));
  }

  function FormContent({ group }: { group: string }) {
    if (!tabGroups[group]) {
      return (
        <View>
          <Text>{group}</Text>
        </View>
      );
    }

    return (
      <View style={{backgroundColor: "black", flex: 1
        
      }}>
        {Object.keys(tabGroups[group]).map((field) => (
          <View
            key={field}
            style={{
              margin: 6,
              borderWidth: 1,
              borderColor: "blue",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {formParam[field].inputType === "input" && (
                <Input
                  field={formParam[field]}
                  onValueChange={(e: any, fillForm: any, errorMsg: any) =>
                    callFather(e, field)
                  }
                  classes={classes}
                />
              )}
              {formParam[field].inputType === "select" && (
                <Select
                  field={formParam[field]}
                  classes={classes}
                  onValueChange={(e: any) => callFather(e, field)}
                />
              )}
              {formParam[field].inputType === "multiSelect" && (
                <MultiSelect
                  classes={classes}
                  field={formParam[field]}
                  onValueChange={(e: any) => callFather(e, field)}
                />
              )}
              {formParam[field].inputType === "boolean" && (
                <Boolean
                  classes={classes}
                  field={formParam[field]}
                  onValueChange={(e: any) => callFather(e, field)}
                />
              )}
              {formParam[field].inputType === "textBox" && (
                <TextBox
                  field={formParam[field]}
                  classes={classes}
                  onValueChange={(e: any) => callFather(e, field)}
                />
              )}
              {formParam[field].inputType === "date" && dateInput(field)}
              {formParam[field].inputType === "file" && (
                <File
                  field={formParam[field]}
                  onValueChange={(e: any) => callFather(e, field)}
                  classes={classes}
                />
              )}
              {formParam[field].inputType === "grid" && (
                <Grid
                  field={formParam[field]}
                  onValueChange={(e: any) => callFather(e, field)}
                  classes={classes}
                />
              )}
              {formParam[field].inputType === "table" && (
                <Table
                  moduleParam={formParam[field].table}
                  classes={classes}
                  urlParam={formParam[field].table.tableSettings?.tableURL}
                  onValueChange={(e: any, whichTable: string) => {
                    callFatherTable(e, field, whichTable);
                  }}
                />
              )}
              {formParam[field].inputType === "button" && (
                <Button
                  field={formParam[field]}
                  classes={classes}
                  onPress={() => {
                    callFatherButton(field);
                  }}
                />
              )}
              {formParam[field].inputType === "image" && (
                <Image
                  field={formParam[field]}
                  classes={classes}
                  setToken={(e: any) => setToken(e, field)}
                />
              )}
              {formParam[field].inputType === "text" && (
                <TextPortal8 field={formParam[field]} classes={classes} />
              )}
              {/* {formParam[field].inputType === "video" && (
        <Video field={formParam[field]} classes={classes} />
        )} */}
              {formParam[field].inputType === "sound" && (
                <Sound field={formParam[field]} classes={classes} />
              )}

              {formParam[field].searchSign && (
                <Pressable
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => onChangeSign(field)}
                >
                  <FontAwesome5
                    name={formParam[field].searchSign}
                    size={18}
                    color="white"
                  />
                </Pressable>
              )}

              {formParam[field].function &&
                formParam[field].inputType !== "button" && (
                  <Pressable
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => callFatherButton(field)}
                  >
                    <FontAwesome5 name="circle" size={18} color="white" />
                  </Pressable>
                )}
            </View>

          </View>
        ))}
      </View>
    );
  }

  if (!loaded) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: "red" }}>
      <Tab.Navigator>
        {Array.from(tabSet).map((pageSet: any) => (
          <Tab.Screen name={pageSet} key={pageSet} options={{ title: pageSet }}>
            {(e) => <FormContent group={pageSet} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
}
