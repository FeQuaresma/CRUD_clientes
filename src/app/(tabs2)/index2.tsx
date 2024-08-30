import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { styles } from "../../constants/styles";

interface ParamInput {
  tag?: string;
  label?: string;
  buttonColor?: string;
  textColor?: string;
}

interface Params {
  [key: string]: ParamInput;
}

function ModTextInput() {
  const [value, setValue] = useState<string>();
  return (
    <TextInput
      id="input1"
      style={{ backgroundColor: "white", width: 200, color: "black" }}
      value={value}
      onChangeText={(e) => setValue(e)}
    />
  );
}

function ModPressable({ label, buttonColor }: ParamInput) {
  return (
    <Pressable style={{ backgroundColor: buttonColor, padding: 10 }}>
      <Text style={{ color: "white" }}>{label}</Text>
    </Pressable>
  );
}

function ModText({ label, textColor }: ParamInput) {
  return <Text style={{ color: textColor }}>{label}</Text>;
}

export default function Home() {
  const params: Params = {
    title: { label: "Home", tag: "ModText", textColor: "white" },
    input1: { tag: "ModTextInput" },
    teste1: { tag: "ModPressable", buttonColor: "red", label: "Teste 1" },
    teste2: { tag: "ModPressable", buttonColor: "blue", label: "Teste 2" },
  };

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      {Object.keys(params).map((key) => (
        <View
          key={key}
          style={{
            margin: 6,
          }}
        >
          {params[key].tag === "ModText" && (
            <ModText
              label={params[key].label}
              textColor={params[key].textColor}
            />
          )}

          {params[key].tag === "ModTextInput" && <ModTextInput />}
          {params[key].tag === "ModPressable" && (
            <ModPressable
              label={params[key].label}
              buttonColor={params[key].buttonColor}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}
