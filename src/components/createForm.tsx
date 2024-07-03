import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  Modal,
  StyleSheet,
} from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import CreateDateField from "./createFields/createDateField";
import CreateFileField from "./createFields/createFileField";
import { styles } from "../constants/styles";

export default function CreateForm(formParam: any) {
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

  const callAPI = async (link: any, value: any) => {
    if (value.toString().length === 8) {
      let linkURL = `${link.paramBeginning}${value}${link.paramEnd}`;
      console.log(linkURL);
      try {
        const response = await fetch(linkURL);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.createFormView}>
      {Object.keys(form).map((field) => (
        <View key={field}>
          {form[field].label && (
            <Text style={styles.inputLabel}>{form[field].label}</Text>
          )}
          {form[field].inputType === "input" && (
            <TextInput
            placeholder={form[field].placeholder}
              style={styles.input}
              value={form[field].value}
              inputMode={form[field].inputMode}
              maxLength={form[field].maxLength}
              onChangeText={(e) => {
                handleInputChange(e, field);
                {
                  form[field].link && callAPI(form[field].link, e);
                }
              }}
            />
          )}
          {form[field].inputType === "dropdown" && (
            <Dropdown
              itemTextStyle={styles.dropdown}
              selectedTextStyle={styles.dropdown}
              placeholderStyle={styles.dropdown}
              style={styles.input}
              data={form[field].options}
              placeholder="Selecione"
              labelField="label"
              valueField="value"
              value={form[field].value}
              onChange={(e) => handleInputChange(e.value, field)}
              mode="modal"
            />
          )}
          {form[field].inputType === "dropdownMulti" && (
            <MultiSelect
              itemTextStyle={styles.dropdown}
              selectedTextStyle={styles.dropdownMulti}
              placeholderStyle={styles.dropdown}
              style={styles.input}
              data={form[field].options}
              placeholder="Selecione"
              labelField="label"
              valueField="value"
              value={form[field].value}
              onChange={(e) => handleInputChange(e, field)}
              mode="modal"
            />
          )}
          {form[field].inputType === "switch" && (
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={form[field].value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={form[field].value}
              onValueChange={(e) => handleInputChange(e, field)}
            />
          )}
          {form[field].inputType === "textBox" && (
            <TextInput
              multiline
              style={styles.inputBox}
              value={form[field] ? form[field].value : null}
              inputMode={form[field].inputMode}
              maxLength={form[field].maxLength}
              onChangeText={(e) => handleInputChange(e, field)}
            />
          )}
          {form[field].inputType === "date" && (
            <CreateDateField
              dateField={form[field].value}
              onDateChange={(e: any) => handleInputChange(e, field)}
            />
          )}
          {form[field].inputType === "file" && (
            <CreateFileField
              onFileChange={(e: any) => handleInputChange(e, field)}
            />
          )}
        </View>
      ))}
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Submit form</Text>
      </Pressable>

      <Modal
        animationType="fade"
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
    </View>
  );
}

// form[item].label, ": ", JSON.stringify(form[item].value)

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
