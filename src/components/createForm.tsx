import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function CreateForm(formParam: any) {
  const [form, setForm] = useState(formParam);
  return (
    <View>
      {Object.keys(form).map((field) => (
        <View key={field}>
          <Text style={styles.inputLabel}>{form[field].label}</Text>
          {form[field].inputType === "input" && (
            <TextInput
              style={styles.input}
              value={form[field].value}
              inputMode={form[field].inputMode}
              maxLength={form[field].maxLength}
              onChangeText={(e) => setForm((prevForm: any) => ({
                ...prevForm,
                [field]: {
                  ...prevForm[field],
                  value: e,
                },
              }))}
            />
          )}
          {form[field].inputType === "dropdown" && (
            <Dropdown
              style={styles.input}
              data={form[field].options}
              labelField="label"
              valueField="value"
              value={form[field].value}
              onChange={(e) => setForm((prevForm: any) => ({
                ...prevForm,
                [field]: {
                  ...prevForm[field],
                  value: e.value,
                },
              }))}
            />
          )}
          {form[field].inputType === "textBox" && (
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.inputBox}
              value={form[field].value}
              inputMode={form[field].inputMode}
              maxLength={form[field].maxLength}
              onChangeText={(e) => setForm((prevForm: any) => ({
                ...prevForm,
                [field]: {
                  ...prevForm[field],
                  value: e,
                },
              }))}
            />
          )}
        </View>
      ))}
      <Pressable
        style={styles.button}
        onPress={() => Object.keys(form).map((item: any) => console.log(form[item].value))}
      >
        <Text style={styles.buttonText}>Teste</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: "#ffffff",
  },
  input: {
    height: 30,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: 200,
  },
  inputBox: {
    height: 60,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: 200,
    
  },
  button: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
