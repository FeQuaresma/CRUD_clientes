import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function HomeScreen() {
  // const [nome, setNome] = useState("");
  // const [genero, setGenero] = useState("");
  // const [idade, setIdade] = useState("");
  // const lista:any = [];

  // const data = [
  //   { label: "homem", value: "homem" },
  //   { label: "mulher", value: "mulher" },
  //   { label: "outro", value: "outro" },
  // ];

  // const submitForm = () => {
  //   lista.push({ Nome: nome, Gênero: genero, Idade: idade });
  //   setNome("");
  //   setGenero("");
  //   setIdade("");
  //   console.log(lista);
  // };

  // return (
  //   <ScrollView contentContainerStyle={styles.container}>
  //     <View>
  //       <Text style={styles.inputLabel}>Nome</Text>
  //       <TextInput
  //         style={styles.input}
  //         value={nome}
  //         onChangeText={(e) => setNome(e)}
  //       />
  //     </View>
  //     <View>
  //       <Text style={styles.inputLabel}>Gênero</Text>
  //       <Dropdown
  //         style={styles.input}
  //         data={data}
  //         labelField={"label"}
  //         valueField={"value"}
  //         value={genero}
  //         onChange={(e) => setGenero(e.value)}
  //       />
  //     </View>
  //     <View>
  //       <Text style={styles.inputLabel}>Idade</Text>
  //       <TextInput
  //         style={styles.input}
  //         value={idade}
  //         onChangeText={(e) => setIdade(e)}
  //         maxLength={2}
  //         inputMode="numeric"
  //       />
  //       <Button title="Submit" onPress={submitForm}/>
  //     </View>
  //     <View></View>
  //   </ScrollView>
  // );

  const formParam: any = [
    { label: "Nome", inputType: "text", dataType: "string", value: "" },
    {
      label: "Gênero",
      inputType: "select",
      dataType: [
        { label: "homem", value: "homem" },
        { label: "mulher", value: "mulher" },
        { label: "outro", value: "outro" },
      ], value: ""
    },
    { label: "Idade", inputType: "text", dataType: "number", value: "" },
    { label: "CNPJ", inputType: "text", dataType: "number", value: "" },
  ];
  const [form, setForm] = useState(formParam);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {form.map((item:any, index:any) => (
        <View key={index}>
          <Text style={styles.inputLabel}>{item.label}</Text>
          {item.inputType === "text" ? (
            <TextInput
              style={styles.input}
              value={item.value}
              onChangeText={(text) => {
                const newForm = [...form];
                newForm[index].value = text;
                setForm(newForm);
              }}
              keyboardType={item.dataType === "number" ? "numeric" : "default"}
            />
          ) : (
            <Dropdown
              style={styles.input}
              data={item.dataType}
              labelField="label"
              valueField="value"
              value={item.value}
              onChange={(e) => {
                const newForm = [...form];
                newForm[index].value = e.value;
                setForm(newForm);
              }}
            />
          )}
        </View>
      ))}
      <Button title="Submit" onPress={() => form.map((value:any)=>console.log(value.value))}/>
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
  },
  inputLabel: {
    color: "#ffffff",
  },
  input: {
    height: 30,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: 200,
  },
});
