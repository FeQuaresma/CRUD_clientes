import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Dropdown as Select } from "react-native-element-dropdown";
import createForm from "../components/createForm";
import { FormParam } from "../constants/FormParam";

export default function Index() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {createForm(FormParam)}
      {/* {createForm(formParam)}
      {Object.keys(form).map((item: any) => (
        <View key={item}>
          <Text style={styles.inputLabel}>{form[item].label}</Text>
          {form[item].inputType === "text" ? (
            <TextInput
              style={styles.input}
              value={form[item].value}
              onChangeText={(e) => setForm({ ...form, [item]: { ...form[item], value: e } })}
              keyboardType={form[item].dataType === "number" ? "numeric" : "default"}
            />
          ) : (
            <Select
              style={styles.input}
              data={form[item].dataType}
              labelField="label"
              valueField="value"
              value={form[item].value}
              onChange={(e) => {
                console.log(e);
              }}
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
      <Button title="Submit" onPress={() => form.map((value:any)=>console.log(value.value))}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    color: "#ffffff",
  }
});
