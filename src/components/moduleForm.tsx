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

export default function ModuleForm({ formParam, formMode, navigation, route }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(formParam);
  const [errorCheckComplete, setErrorCheckComplete] = useState(false);


  useEffect(() => {
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

  const setErrorMsg = () => {
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
  };

  const handleModal = () => {
    for (const field of Object.keys(form)) {
      if (form[field].errorMsg != "") {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (
    e: any,
    field: any,
    fillForm?: any,
    errorMsg?: any
  ) => {
    // Máscara de input
    if (form[field].masks) {
      const mask = (value: any, masks: Array<string>) => {
        let v = value.replace(/\D/g, "");
        let pattern = "";

        for (let i = 0; i < masks.length; i++) {
          let maskOn = masks[i].replace(/[^0-9#]/g, "").length;
          if (v.length === maskOn) {
            pattern = masks[i];
            break;
          }
        }

        if (pattern === "") {
          return v;
        }

        let i = 0;
        const maskedValue = pattern.replace(/#/g, () => v[i++] || "");
        return maskedValue;
      };

      let eMasked = mask(e, form[field].masks);
      setForm((prevForm: any) => ({
        ...prevForm,
        [field]: {
          ...prevForm[field],
          valueMasked: eMasked,
        },
      }));
      e = e.replace(/\D/g, "");
    }

    //inserir dados no input
    setForm((prevForm: any) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        value: e,
      },
    }));

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
  };

  const handleFilterNavigation = () => {
    let formData: any = {};
    let colVisibility: string[] = [];
    Object.keys(form).map((key) => {
      if (form[key].value !== "") {
        formData[key] = form[key].value;
      }
      if (!form[key].isVisible) {
        colVisibility.push(key);
      }
    });
    console.log(formData);
    navigation.navigate("FinalTable", { formData, colVisibility });
  };

  const handleFilterCallBack = (fillForm: any) => {
    if (fillForm.formData) {
      Object.keys(fillForm.formData).map((formField) => {
        if (form[formField]) {
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
  };

  const handleVisibilityChange = (field: string) => {
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
  };

  const handleResetForm = () => {
    Object.keys(form).forEach((field) => {
      (form[field].value !== "" ||
        form[field].isVisible !== formParam[field].isVisible) &&
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            value: formParam[field].value,
            isVisible: formParam[field].isVisible,
          },
        }));
    });
  };

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
              {form[field].inputType === "date" && (
                <Date
                  field={form[field].value}
                  onValueChange={(e: any) => handleInputChange(e, field)}
                />
              )}
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
