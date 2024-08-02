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
import { modulesParam } from "../constants/moduleParam";
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "../context/SyncedScrollViewContext";
import { SyncedScrollView } from "../components/SyncedScrollView";

type ColumnKey = `appTableCol${number | string}`;

export default function FinalTable() {
  const lockedSet = new Set<string>();
  const params = modulesParam.pedido.table ? modulesParam.pedido.table : {};
  const [data, setData] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  const [search, setSearch] = useState("");
  const [lockedColTable, setLockedColTable] = useState(lockedSet);
  const [colTable, setColTable] = useState<Set<string>>(new Set());
  const [colTableBackup, setColTableBackup] = useState<Set<string>>();

  useEffect(() => {
    loadData().then((dataOnline) => {
      setData(dataOnline);
      setDataBackup(dataOnline);
    });
    const dataSet: Set<string> = new Set(
      Object.keys(params).map((colKey) => colKey)
    );
    setColTable(dataSet);
    setColTableBackup(dataSet);
    console.log("Data loaded!");
  }, []);

  function loadData() {
    return fetch("https://www.caae.org.br/teste/teste.json")
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  function handleLockedTable(colKey: string) {
    let lockedColTableTemp = new Set(lockedColTable);
    let colTableBackupTemp = new Set(colTableBackup);

    if (lockedColTableTemp.has(colKey)) {
      lockedColTableTemp.delete(colKey);
    } else {
      lockedColTableTemp.add(colKey);
    }

    lockedColTableTemp.forEach((colKey) => colTableBackupTemp.delete(colKey));
    console.log(lockedColTableTemp);
    console.log(colTableBackupTemp);

    setColTable(colTableBackupTemp);
    setLockedColTable(lockedColTableTemp);
  }

  function handleSizeLockedTable() {
    if (Array.from(lockedColTable).length <= 0) {
      return 0;
    }
    if (params[Array.from(lockedColTable)[0]].tableWidth < 200) {
      return params[Array.from(lockedColTable)[0]].tableWidth;
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
            onPress={() => console.log(data)}
          >
            <FontAwesome name="search" size={24} color="white" />
          </Pressable>
          <Pressable
            style={styles.filterIcon}
            onPress={() => console.log(colTable)}
          >
            <FontAwesome name="filter" size={24} color="white" />
          </Pressable>
        </View>
        <Text style={styles.text}>Tabela de Pedidos</Text>

        <View style={styles.table}>

        <ScrollView
            horizontal={true}
            style={{minWidth: handleSizeLockedTable()}}
            showsHorizontalScrollIndicator={false}
          >
            <Table>
              <TableWrapper style={styles.header}>
                {Array.from(lockedColTable).map((colKey, colIndex) => {
                  return (
                    <Pressable
                      key={colKey}
                      onPress={() => handleLockedTable(colKey)}
                    >
                      <Cell
                        key={colIndex}
                        data={params[colKey].label}
                        style={styles.cellHead}
                        textStyle={styles.cellHeadText}
                        width={params[colKey].tableWidth}
                      />
                    </Pressable>
                  );
                })}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={0}
                showsVerticalScrollIndicator={false}
              >
                {data.map((rowData, rowIndex) => {
                  return (
                    <TableWrapper key={rowIndex} style={styles.header}>
                      {Array.from(lockedColTable).map((colKey, colIndex) => {
                        return (
                          <Cell
                            key={colIndex}
                            data={rowData[colKey]}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        );
                      })}
                    </TableWrapper>
                  );
                })}
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
                {Array.from(colTable).map((colKey, colIndex) => {
                  return (
                    <Pressable
                      key={colKey}
                      onPress={() => handleLockedTable(colKey)}
                    >
                      <Cell
                        key={colIndex}
                        data={params[colKey].label}
                        style={styles.cellHead}
                        textStyle={styles.cellHeadText}
                        width={params[colKey].tableWidth}
                      />
                    </Pressable>
                  );
                })}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={1}
                showsVerticalScrollIndicator={false}
              >
                {data.map((rowData, rowIndex) => {
                  return (
                    <TableWrapper key={rowIndex} style={styles.header}>
                      {Array.from(colTable).map((colKey, colIndex) => {
                        return (
                          <Cell
                            key={colIndex}
                            data={rowData[colKey]}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        );
                      })}
                    </TableWrapper>
                  );
                })}
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
    height: 60,
  },
  header: {
    flexDirection: "row",
  },
  tableLeft: {},
  tableRight: {},
});
