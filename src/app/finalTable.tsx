import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";

import { modulesParam } from "../constants/moduleParam";

export default function FinalTable() {
  const params = Object.keys(modulesParam.cliente.formParam).map(
    (label) => modulesParam.cliente.formParam[label].label
  );
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.serchBar}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise..."
          value={search}
          onChangeText={(e) => setSearch(e)}
        />
        <Pressable
          style={styles.searchIcon}
          onPress={() => console.log(params)}
        >
          <FontAwesome name="search" size={24} color="white" />
        </Pressable>
        <Pressable
          style={styles.filterIcon}
          onPress={() => console.log("Abre o modal de filtros")}
        >
          <FontAwesome name="filter" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={styles.text}>Final Table</Text>
      <View style={styles.tabela}>
        <ScrollView horizontal={true}>
          <TableWrapper style={styles.header}>
            {params.map(
              (colData, colIndex) =>
                colData !== "" && (
                  <Cell key={colIndex} data={colData} style={styles.cellHead} />
                )
            )}
          </TableWrapper>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  serchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  searchIcon: {
    backgroundColor: "green",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    backgroundColor: "blue",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 40,
    padding: 8,
    backgroundColor: "#fff",
  },
  tabela: {
    width: "80%",
    height: "70%",
    backgroundColor: "white",
  },
  cellHead: {
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    height: 50
  },
  header: {
    flexDirection: "row",
  },
});
