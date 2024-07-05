import { ScrollView } from "react-native";
import CreateForm from "../components/createForm";
import { FormParam } from "../constants/formParamEndereco";
import { styles } from "../constants/styles";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateForm formParam={FormParam} />
    </ScrollView>
  );
}
