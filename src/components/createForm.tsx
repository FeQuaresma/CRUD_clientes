import { useState } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
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
} from "./createFields";
import { styles, stylesModal } from "../constants/styles";

export default function CreateForm({ formParam }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(formParam);

  const handleInputChange = (e: any, field: any) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        value: e,
      },
    }));
  };

  return (
    <ScrollView>
      {/* <KeyboardAvoidingView
      style={styles.createFormView}
      keyboardVerticalOffset={30}
      behavior={"height"}
    > */}
      {Object.keys(form).map((field) => (
        <View key={field}>
          {form[field].label && (
            <Text style={styles.inputLabel}>{form[field].label}</Text>
          )}
          {form[field].inputType === "input" && (
            <Input
              field={form[field]}
              onValueChange={(e: any) => handleInputChange(e, field)}
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
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Submit form</Text>
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
              <Text style={stylesModal.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
}
