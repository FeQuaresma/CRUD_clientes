import { useState } from "react";
import { Text, View, Pressable, Modal, ScrollView } from "react-native";
import {
  Date,
  Select,
  File,
  Input,
  MultiSelect,
  Boolean,
  TextBox,
  Grid,
} from "./createFields";
import { styles, stylesModal } from "../constants/styles";

export default function CreateForm({ formParam }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(formParam);

  const setErrorMsg = () => {
    Object.keys(form).map((field: any) => {
      if (form[field].value === "" && form[field].required) {
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            errorMsg: "Campo obrigatório",
          },
        }));
      } else {
        setForm((prevForm: any) => ({
          ...prevForm,
          [field]: {
            ...prevForm[field],
            errorMsg: "",
          },
        }));
      }
    });
  };

  const handleModal = () => {
    for (const field of Object.keys(form)) {
      console.log(form[field].errorMsg);
      if (form[field].errorMsg != "") {
        console.log("return false");
        return false;
      }
    };
    return true;
  };

  const handleInputChange = (
    e: any,
    field: any,
    apiData?: any,
    errorMsg?: any
  ) => {
    if (form[field].masks) {
      const mask = (value: any, masks: Array<string>) => {
        let v = value.replace(/\D/g, "");
        let pattern = "";

        for (let i = 0; i < masks.length; i++) {
          let maskOn = masks[i].replace(/[^0-9#]/g, "").length;
          // console.log("maskOn: ", maskOn, " / v.Lenght: ", v.length);
          if (v.length === maskOn) {
            pattern = masks[i];
            // console.log("pattern: ", pattern);
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

    setForm((prevForm: any) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        value: e,
      },
    }));

    if (apiData) {
      Object.keys(apiData).map((formField) => {
        if (form[formField]) {
          setForm((prevForm: any) => ({
            ...prevForm,
            [formField]: {
              ...prevForm[formField],
              value: apiData[formField],
            },
          }));
        }
      });
    }

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

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <View>
        {Object.keys(form).map((field) => (
          <View key={field}>
            {form[field].label && (
              <Text style={styles.inputLabel}>{form[field].label}</Text>
            )}
            {form[field].errorMsg && (
              <Text style={styles.errorMsg}>{form[field].errorMsg}</Text>
            )}
            {form[field].inputType === "input" && (
              <Input
                field={form[field]}
                onValueChange={(e: any, apiData: any, errorMsg: any) =>
                  handleInputChange(e, field, apiData, errorMsg)
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
        <Pressable
          style={styles.button}
          onPress={() => {
            setErrorMsg();
            console.log(handleModal());
            handleModal() && setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Enviar Formulário</Text>
        </Pressable>

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
      </View>
    </ScrollView>
  );
}
