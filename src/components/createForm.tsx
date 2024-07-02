import { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import CreateDateField from "./createFields/createDateField";
import { styles } from "../constants/styles";

export default function CreateForm(formParam: any) {
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
    <View>
      {Object.keys(form).map((field) => (
        <View key={field}>
          {form[field].label && (
            <Text style={styles.inputLabel}>{form[field].label}</Text>
          )}
          {form[field].inputType === "input" && (
            <TextInput
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
              style={styles.input}
              data={form[field].options}
              labelField="label"
              valueField="value"
              value={form[field].value}
              onChange={(e) => handleInputChange(e.value, field)}
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
        </View>
      ))}
      <Pressable
        style={styles.button}
        onPress={() =>
          Object.keys(form).map((item: any) =>
            console.log(form[item].label, ": ", form[item].value)
          )
        }
      >
        <Text style={styles.buttonText}>Teste</Text>
      </Pressable>
    </View>
  );
}
