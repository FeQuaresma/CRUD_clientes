import { Pressable, ScrollView, Text } from "react-native";
import { styles } from "../constants/styles";

export default function ModuleIndex({ moduleName, appJson, getData, navigation }: any) {



  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text style={styles.inputLabel}>Menu {moduleName}</Text>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() =>
          getData.then((data: any) =>
            console.log(data.modules.cliente.functions)
          )
        }
      >
        <Text style={styles.buttonText}>Get Data</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => console.log(appJson.modules.cliente.functions)}
      >
        <Text style={styles.buttonText}>appJson</Text>
      </Pressable>
    </ScrollView>
  );
}
