import { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
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
} from "./fields";
import { styles } from "../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { executeFunction } from "../functions/executeJsonFunctions";
import Button from "./fields/button";

export default function ModuleForm({
  formParam,
  formMode,
  navigation,
  route,
  callFather
}: any) {

  const [form, setForm] = useState(formParam);

  const [errorCheckComplete, setErrorCheckComplete] = useState(false);

  useEffect(() => {
    handleFilterCallBack(route.params);
  }, [route.params]);

  function setErrorMsg() {
    Object.keys(form).map((field: string) => {
      if (form[field].value === "" && form[field].isRequired) {
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            errorMsg: "Campo obrigatório",
          },
        }));
      } else if (form[field].errorMsg === "Campo obrigatório") {
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            errorMsg: "",
          },
        }));
      }
    });
    setErrorCheckComplete(true);
  }

  function handleModal() {
    for (const field of Object.keys(form)) {
      if (form[field].errorMsg != "") {
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
              field={form[field]}
              dateOrder="start"
              onValueChange={(e: any, type: any) =>
                handleInputChange(e, field, undefined, undefined, type)
              }
            />
            <Date
              field={form[field]}
              dateOrder="end"
              onValueChange={(e: any, type: any) => {
                handleInputChange(e, field, undefined, undefined, type);
              }}
            />
          </View>
        );
      case "register":
        return (
          <Date
            field={form[field].value}
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
    if (form[field].masks) {
      if (form[field].zeroTrim) {
        e = e.replace(/\D/g, "").replace(/^0+/, "");
      } else {
        e = e.replace(/\D/g, "");
      }
      let eMasked = maskedValue(e, form[field].masks);

      if (dateOrder) {
        setForm((prevForm: any) => ({
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
        setForm((prevForm: any) => ({
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
      setForm((prevForm: any) => ({
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
      setForm((prevForm: any) => ({
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
        if (form[formField]) {
          setForm((prevForm: any) => ({
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
    if (form[field].errorMsg != undefined) {
      setForm((prevForm: any) => ({
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

    Object.keys(form).map((key) => {
      let value = form[key].value;
      form[key].isCurrency && (value = (value / 100).toFixed(2));
      if (form[key].value !== "" && form[key].inputType !== "date") {
        if (form[key].searchSign) {
          switch (form[key].searchSign) {
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

      if (form[key].inputType === "date") {
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

      if (!form[key].isVisible) {
        colVisibility.push(key);
      }
    });

    navigation.navigate("ModuleList", { formData, colVisibility });
  }

  function handleFilterCallBack(fillForm: any) {
    if (fillForm?.formData) {
      Object.keys(fillForm.formData).map((formField) => {
        if (form[formField].inputType === "date") {
          setForm((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],

              value: maskedValueDate(
                fillForm.formData[formField],
                form[formField].callbackMask
              ),
              valueMasked: maskedValueDate(
                fillForm.formData[formField],
                form[formField].masks[0]
              ),
            },
          }));
        } else if (form[formField].searchSign) {
          let cleanValue = fillForm.formData[formField].replace(/\D/g, "");

          switch (fillForm.formData[formField][0]) {
            case ">":
              setForm((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(cleanValue, form[formField].masks),
                  searchSign: "greater-than",
                },
              }));
              break;
            case "<":
              setForm((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(cleanValue, form[formField].masks),
                  searchSign: "less-than",
                },
              }));
              break;
            default:
              setForm((prevForm: any) => ({
                ...prevForm,
                [formField]: {
                  ...prevForm[formField],
                  value: cleanValue,
                  valueMasked: maskedValue(cleanValue, form[formField].masks),
                  searchSign: "equals",
                },
              }));
              break;
          }
        } else if (form[formField]) {
          setForm((prevForm: any) => ({
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
      Object.keys(form).forEach((key) => {
        if (fillForm.colVisibility.includes(key)) {
          setForm((prevForm: any) => ({
            ...prevForm,
            [key]: {
              ...prevForm[key],
              isVisible: false,
            },
          }));
        } else {
          setForm((prevForm: any) => ({
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
    if (form[field].isVisible) {
      setForm((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          isVisible: false,
        },
      }));
    } else {
      setForm((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          isVisible: true,
        },
      }));
    }
  }

  function handleResetForm() {
    setForm(formParam);
  }

  function onChangeSign(field: any) {
    let changeTo = "";

    switch (form[field].searchSign) {
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

    setForm((prevForm: any) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        searchSign: changeTo,
      },
    }));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      style={styles.containerView}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{ width: 30 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </Pressable>
        {formMode === "filter" && (
          <Text style={{ ...styles.inputLabel, flex: 1, textAlign: "center" }}>
            Filtro
          </Text>
        )}
        {formMode === "register" && (
          <Text style={{ ...styles.inputLabel, flex: 1, textAlign: "center" }}>
            Cadastro
          </Text>
        )}
        <View style={{ width: 30 }} />
        <Text></Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.containerScrollView,
        }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {Object.keys(form).map((field) => (
            <View
              key={field}
              style={{
                margin: 6,
              }}
            >
              {form[field].label && (
                <View
                  style={{
                    margin: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.inputLabel}>
                    {form[field].label}
                    {form[field].isRequired && "*"}
                  </Text>
                  {formMode === "filter" && (
                    <View style={{ flexDirection: "row" }}>
                      {form[field].isVisible && (
                        <Pressable
                          style={{
                            height: 22,
                            width: 22,
                            backgroundColor: "green",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                          }}
                          onPress={() => {
                            handleVisibilityChange(field);
                          }}
                        >
                          <Ionicons name="eye" size={15} color="white" />
                        </Pressable>
                      )}
                      {!form[field].isVisible && (
                        <Pressable
                          style={{
                            height: 22,
                            width: 22,
                            backgroundColor: "red",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                          }}
                          onPress={() => {
                            handleVisibilityChange(field);
                          }}
                        >
                          <Ionicons name="eye-off" size={15} color="white" />
                        </Pressable>
                      )}
                    </View>
                  )}
                </View>
              )}

              {form[field].errorMsg && (
                <Text style={styles.errorMsg}>{form[field].errorMsg}</Text>
              )}
              <View style={{ flexDirection: "row" }}>
                {form[field].inputType === "input" && (
                  <Input
                    field={form[field]}
                    onValueChange={(e: any, fillForm: any, errorMsg: any) =>
                      handleInputChange(e, field, fillForm, errorMsg)
                    }
                  />
                )}
                {form[field].inputType === "select" && (
                  <Select
                    field={form[field]}
                    onValueChange={(e: any) => handleInputChange(e, field)}
                  />
                )}
                {form[field].inputType === "multiSelect" && (
                  <MultiSelect
                    field={form[field]}
                    onValueChange={(e: any) => handleInputChange(e, field)}
                  />
                )}
                {form[field].inputType === "boolean" && (
                  <Boolean
                    field={form[field]}
                    onValueChange={(e: any) => handleInputChange(e, field)}
                  />
                )}
                {form[field].inputType === "textBox" && (
                  <TextBox
                    field={formParam[field]}
                    onValueChange={(e: any) => callFather(e, field)}
                  />
                )}
                {form[field].inputType === "date" && dateInput(field)}
                {form[field].inputType === "file" && (
                  <File
                    field={form[field]}
                    onValueChange={(e: any) => handleInputChange(e, field)}
                  />
                )}
                {form[field].inputType === "grid" && (
                  <Grid
                    field={form[field]}
                    onValueChange={(e: any) => handleInputChange(e, field)}
                  />
                )}
                {form[field].inputType === "table" && (
                  <Table
                    moduleParam={form[field].table}
                    urlParam={form[field].table.tableSettings.tableURL}
                  />
                )}
                {form[field].inputType === "button" && (
                  <Button
                    field={formParam[field]}
                    callFather={(e:any)=>{callFather(e, field)}}
                  />
                )}

                {form[field].searchSign && (
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
                      name={form[field].searchSign}
                      size={18}
                      color="white"
                    />
                  </Pressable>
                )}
                {form[field].function && (
                  <Pressable
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => executeFunction(form[field].function, form)}
                  >
                    <FontAwesome5 name="circle" size={18} color="white" />
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ width: "100%", alignItems: "center" }}>
        {formMode === "register" && (
          <Pressable
            style={styles.button}
            onPress={() => {
              console.log(form);
            }}
          >
            <Text style={styles.buttonText}>Enviar Formulário</Text>
          </Pressable>
        )}

        {formMode === "filter" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={styles.button}
              onPress={() => handleFilterNavigation()}
            >
              <Text style={styles.buttonText}>Filtrar</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleResetForm()}
            >
              <MaterialCommunityIcons name="broom" size={26} color="white" />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => console.log(form.total)}
            >
              <MaterialCommunityIcons name="circle" size={26} color="white" />
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
