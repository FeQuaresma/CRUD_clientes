import { ScrollView } from "react-native";
import CreateForm from "../../components/createForm";
import { FormParam } from "../../constants/formParam";
import { styles } from "../../constants/styles";

export default function Enderecos(){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateForm formParam={FormParam.enderecos} />
    </ScrollView>
  );
}
