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
} from "./fields";
import { styles, stylesModal } from "../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ModuleForm({
  formParam,
  formMode,
  navigation,
  route,
}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(formParam);
  const [errorCheckComplete, setErrorCheckComplete] = useState(false);

  useEffect(() => {
    console.log(route.params)
    handleFilterCallBack(route.params);
  }, [route.params]);

  useEffect(() => {
    if (errorCheckComplete) {
      if (handleModal()) {
        setModalVisible(true);
      }
      setErrorCheckComplete(false); // Reset para a próxima verificação de erro
    }
  }, [errorCheckComplete, form]);

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
              onValueChange={(e: any) =>
                handleInputChange(e, field, undefined, undefined, "start")
              }
            />
            <Date
              field={form[field]}
              dateOrder="end"
              onValueChange={(e: any) =>
                handleInputChange(e, field, undefined, undefined, "end")
              }
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

  function handleInputChange(
    e: any,
    field: string,
    fillForm?: any,
    errorMsg?: any,
    dateOrder?: string
  ) {
    // Máscara de input
    if (form[field].masks) {
      e = e.replace(/\D/g, "");
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
      if (form[key].value !== "" && form[key].inputType !== "date") {
        formData[key] = form[key].value;
      }

      if (form[key].inputType === "date") {
        if (
          !(
            typeof form[key].value === "object" &&
            form[key].value.end === "" &&
            form[key].value.start === ""
          )
        ) {
          formData[key] = {
            start: form[key].value.start.replace(
              /^(\d{2})(\d{2})(\d{4})$/,
              "$3-$2-$1"
            ),
            end: form[key].value.end.replace(
              /^(\d{2})(\d{2})(\d{4})$/,
              "$3-$2-$1"
            ),
          };
        } else if (
          typeof form[key].value === "string" &&
          form[key].value !== ""
        ) {
          formData[key] = form[key].value.replace(
            /^(\d{2})(\d{2})(\d{4})$/,
            "$3-$2-$1"
          );
        }
      }

      if (!form[key].isVisible) {
        colVisibility.push(key);
      }
    });

    console.log(formData);

    navigation.navigate("FinalTable", { formData, colVisibility });
  }

  function handleFilterCallBack(fillForm: any) {
    if (fillForm.formData) {
      Object.keys(fillForm.formData).map((formField) => {
        if (form[formField].valueMasked) {
          setForm((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],
              value: fillForm.formData[formField],
              valueMasked: fillForm.formData[formField]
            },
          }));
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
    if (fillForm.colVisibility) {
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
      // fillForm.colVisibility.forEach((e:string)=>{
      //   console.log(e)
      // })
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
    Object.keys(form).forEach((field) => {
      (form[field].value !== "" ||
        form[field].isVisible !== formParam[field].isVisible) &&
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            value: formParam[field].value,
            valueMasked: formParam[field].valueMasked,
            isVisible: formParam[field].isVisible,
          },
        }));
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerView}
    >
      <ScrollView
        contentContainerStyle={{
          ...styles.containerScrollView,
        }}
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
                  field={form[field]}
                  onValueChange={(e: any) => handleInputChange(e, field)}
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
            </View>
          ))}
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              {Object.keys(form).map((item: any) => (
                <Text
                  key={item}
                  style={stylesModal.modalText}
                >{`${form[item].label}: ${form[item].value} `}</Text>
              ))}
              <Pressable
                style={[stylesModal.button, stylesModal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={stylesModal.textStyle}>Preencher novamente</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={{ width: "100%", alignItems: "center" }}>
        {formMode === "Regiter" && (
          <Pressable
            style={styles.button}
            onPress={() => {
              setErrorMsg();
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
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
