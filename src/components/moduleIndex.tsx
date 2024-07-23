import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";
import { FlipInEasyX } from "react-native-reanimated";

export default function ModuleIndex({ moduleName }: any) {
  const navigation: any = useNavigation();
  const route = useRoute();
  const data: any = route.params;
  console.log(data);
  const [father, setFather] = useState("");
  const [children, setChildren] = useState("");
  const [info, setInfo] = useState("");

  const routes = useNavigationState((state) => state);

  return (
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        <Text style={styles.inputLabel}>Menu {moduleName}</Text>
        {data && <Text style={styles.inputLabel}>Param: {data.data}</Text>}
        <Text style={styles.inputLabel}>Father</Text>
        <TextInput
          style={styles.input}
          value={father}
          onChangeText={(e) => setFather(e)}
        />
        <Text style={styles.inputLabel}>Children</Text>
        <TextInput
          style={styles.input}
          value={children}
          onChangeText={(e) => setChildren(e)}
        />

        <Text style={styles.inputLabel}>Data</Text>
        <TextInput
          style={styles.input}
          value={info}
          onChangeText={(e) => setInfo(e)}
        />
        <Pressable
          style={styles.button}
          onPress={() => console.log(routes.routes)}
        >
          <Text style={styles.buttonText}>Rotas</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            try {
              navigation.navigate(father, {
                screen: children,
                params: { data: info },
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text style={styles.buttonText}>Navegar</Text>
        </Pressable>
      </ScrollView>
  );
}
