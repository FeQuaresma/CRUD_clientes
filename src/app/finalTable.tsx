import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import { modulesParam } from "../constants/moduleParam";

type ColumnKey = `appTableCol${number | string}`;

export default function FinalTable() {
  const myset = new Set([0]);
  const params = Object.keys(modulesParam.pedido.formParam).map(
    (label) => modulesParam.pedido.formParam[label].label
  );
  const [data, setData] = useState(modulesParam.pedido.data);
  const [search, setSearch] = useState("");
  const [lockedCol, setLockedCol] = useState(myset);

  useEffect(() => console.log(lockedCol), [lockedCol]);

  function handleLockedCol(colIndex: number) {
    let lockedColTemp = new Set(lockedCol);
    if (lockedColTemp.has(colIndex)) {
      lockedColTemp.delete(colIndex);
    } else {
      lockedColTemp.add(colIndex);
    }
    console.log(lockedColTemp);
    setLockedCol(lockedColTemp);
  }

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
      <Text style={styles.text}>Tabela de Pedidos</Text>

      <View style={styles.tabela}>
        <ScrollView horizontal={true}>
          <Table>
            <TableWrapper style={styles.header}>
              {params.map((colData, colIndex) =>
                lockedCol.has(colIndex) ? (
                  <Pressable
                    key={colIndex}
                    onPress={() => handleLockedCol(colIndex)}
                  >
                    <Cell
                      key={colIndex}
                      data={colData}
                      style={styles.cellHead}
                      textStyle={styles.cellHeadText}
                    />
                  </Pressable>
                ) : (
                  <View key={colIndex}></View>
                )
              )}
            </TableWrapper>
            <ScrollView>
              {data?.map((rowData, rowIndex) => (
                <TableWrapper key={rowIndex} style={styles.header}>
                  {rowData.map((colData, colIndex) => (
                    lockedCol.has(colIndex) ? (
                    <Cell
                      key={colIndex}
                      data={colData}
                      style={styles.cellData}
                    />
                  ) : (
                    <View key={colIndex}></View>
                  )
                  ))}

                </TableWrapper>
              ))}
            </ScrollView>
          </Table>
        </ScrollView>

        <ScrollView horizontal={true}>
          <Table>
            <TableWrapper style={styles.header}>
            {params.map((colData, colIndex) =>
                !lockedCol.has(colIndex) ? (
                  <Pressable
                    key={colIndex}
                    onPress={() => handleLockedCol(colIndex)}
                  >
                    <Cell
                      key={colIndex}
                      data={colData}
                      style={styles.cellHead}
                      textStyle={styles.cellHeadText}
                    />
                  </Pressable>
                ) : (
                  <View key={colIndex}></View>
                )
              )}
            </TableWrapper>
            <ScrollView>
              {data?.map((rowData, rowIndex) => (
                <TableWrapper key={rowIndex} style={styles.header}>
                  {rowData.map((colData, colIndex) => (
                    !lockedCol.has(colIndex) ? (
                    <Cell
                      key={colIndex}
                      data={colData}
                      style={styles.cellData}
                    />
                  ) : (
                    <View key={colIndex}></View>
                  )
                  ))}

                </TableWrapper>
              ))}
            </ScrollView>
          </Table>
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
    flexDirection: "row",
    width: "95%",
    height: "75%",
    backgroundColor: "white",
  },
  cellHead: {
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: 100,
    height: 60,
  },
  cellHeadText: {
    color: "#fff",
  },
  cellData: {
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: 100,
  },
  header: {
    flexDirection: "row",
  },
});
