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
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import { modulesParam } from "../constants/moduleParamBackup";
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "../context/SyncedScrollViewContext";
import { SyncedScrollView } from "../components/SyncedScrollView";

type ColumnKey = `appTableCol${number | string}`;

export default function FinalTable() {
  const lockedSet = new Set<number>();
  const params = Object.keys(modulesParam.pedido.formParam).map(
    (label) => modulesParam.pedido.formParam[label].label
  );
  const tableWidth = modulesParam.pedido.tableWidth;
  const [dataJson, setDataJson] = useState([]);
  const [data, setData] = useState(modulesParam.pedido.data);
  const [search, setSearch] = useState("");
  const [lockedTable, setLockedTable] = useState(lockedSet);

  useEffect(() => {
    loadData().then((dataOnline) => setDataJson(dataOnline));
    console.log("Data loaded!")
  }, []);

  function loadData() {
    return fetch("https://www.caae.org.br/teste/teste.json")
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  function handleLockedTable(colIndex: number) {
    let lockedTableTemp = new Set(lockedTable);
    if (lockedTableTemp.has(colIndex)) {
      lockedTableTemp.delete(colIndex);
    } else {
      lockedTableTemp.add(colIndex);
    }
    console.log(lockedTableTemp);

    setLockedTable(lockedTableTemp);
  }

  function handleSizeLockedTable() {
    if (Array.from(lockedTable).length <= 0) {
      return 0;
    }
    if (tableWidth && tableWidth[Array.from(lockedTable)[0]] < 200) {
      return tableWidth[Array.from(lockedTable)[0]];
    }
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
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
            onPress={() => console.log(dataJson[0])}
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

        <View style={styles.table}>
          <ScrollView
            horizontal={true}
            style={{ minWidth: handleSizeLockedTable() }}
            showsHorizontalScrollIndicator={false}
          >
            <Table>
              <TableWrapper style={styles.header}>
                {Array.from(lockedTable).map((colData, colIndex) => (
                  <Pressable
                    key={colIndex}
                    onPress={() => handleLockedTable(colData)}
                  >
                    <Cell
                      key={colIndex}
                      data={params[colData]}
                      style={styles.cellHead}
                      textStyle={styles.cellHeadText}
                      width={tableWidth && tableWidth[colData]}
                    />
                  </Pressable>
                ))}

                {/* {params.map((colData, colIndex) =>
                  lockedTable.has(colIndex) ? (
                    <Pressable
                      key={colIndex}
                      onPress={() => handleLockedTable(colIndex)}
                    >
                      <Cell
                        key={colIndex}
                        data={colData}
                        style={styles.cellHead}
                        textStyle={styles.cellHeadText}
                        width={tableWidth && tableWidth[colIndex]}
                      />
                    </Pressable>
                  ) : (
                    <View key={colIndex}></View>
                  )
                )} */}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={0}
                showsVerticalScrollIndicator={false}
              >
                {data?.map((rowData, rowIndex) => (
                  <TableWrapper key={rowIndex} style={styles.header}>
                    {Array.from(lockedTable).map((colData, colIndex) => (
                      <Cell
                        key={colIndex}
                        data={rowData[colData]}
                        style={styles.cellData}
                        width={tableWidth && tableWidth[colData]}
                      />
                    ))}
                    {/* {rowData.map((colData, colIndex) =>
                      lockedTable.has(colIndex) ? (
                        <Cell
                          key={colIndex}
                          data={colData}
                          style={styles.cellData}
                          width={tableWidth && tableWidth[colIndex]}
                        />
                      ) : (
                        <View key={colIndex}></View>
                      )
                    )} */}
                  </TableWrapper>
                ))}
              </SyncedScrollView>
            </Table>
          </ScrollView>

          <ScrollView
            horizontal={true}
            style={{ minWidth: "50%" }}
            showsHorizontalScrollIndicator={false}
          >
            <Table>
              <TableWrapper style={styles.header}>
                {params.map((colData, colIndex) =>
                  !lockedTable.has(colIndex) ? (
                    <Pressable
                      key={colIndex}
                      onPress={() => handleLockedTable(colIndex)}
                    >
                      <Cell
                        key={colIndex}
                        data={colData}
                        style={styles.cellHead}
                        textStyle={styles.cellHeadText}
                        width={tableWidth && tableWidth[colIndex]}
                      />
                    </Pressable>
                  ) : (
                    <View key={colIndex}></View>
                  )
                )}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={1}
                showsVerticalScrollIndicator={false}
              >
                {data?.map((rowData, rowIndex) => (
                  <TableWrapper key={rowIndex} style={styles.header}>
                    {rowData.map((colData, colIndex) =>
                      !lockedTable.has(colIndex) ? (
                        <Cell
                          key={colIndex}
                          data={colData}
                          style={styles.cellData}
                          width={tableWidth && tableWidth[colIndex]}
                        />
                      ) : (
                        <View key={colIndex}></View>
                      )
                    )}
                  </TableWrapper>
                ))}
              </SyncedScrollView>
            </Table>
          </ScrollView>
        </View>
      </View>
    </SyncedScrollViewContext.Provider>
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
  table: {
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
  },
  header: {
    flexDirection: "row",
  },
  tableLeft: {},
  tableRight: {},
});
