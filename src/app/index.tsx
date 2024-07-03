import { ScrollView } from "react-native";
import createForm from "../components/createForm";
import { FormParam } from "../constants/FormParam";
import { styles } from "../constants/styles";

export default function Index() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {createForm(FormParam)}
    </ScrollView>
  );
}
