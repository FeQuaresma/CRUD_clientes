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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import { modulesParam } from "../constants/moduleParam";
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "../context/SyncedScrollViewContext";
import { SyncedScrollView } from "../components/SyncedScrollView";

type DataRow = {
  [key: string]: string;
};

type DataTable = {
  formAtual: DataRow[];
  [key: string]: any;
};

export default function FinalTable({ navigation, route }: any) {
  const params = modulesParam.pedido.tableParam
    ? modulesParam.pedido.tableParam
    : {};

  const [data, setData] = useState<DataRow[]>([]);
  const [dataBackup, setDataBackup] = useState<DataRow[]>([]);

  const [searchWord, setSearchWord] = useState("");
  const [lockedColTable, setLockedColTable] = useState<Set<string>>(new Set());
  const [colTable, setColTable] = useState<Set<string>>(new Set());
  const [colTableBackup, setColTableBackup] = useState<Set<string>>();

  const [colVisibility, setColVisibility] = useState<string[]>([]);
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    console.log(route.params);
    setRouteParams(route.params);
    setColVisibility(route.params.colVisibility);
  }, [route.params]);

  useEffect(() => {
    console.log(colVisibility);
    console.log(colTable);
    console.log(lockedColTable);
  }, [colTable]);

  useEffect(() => {
    loadData().then((dataOnline: DataTable) => {
      dataOnline.formAtual.forEach((dataRow: DataRow) => {
        Object.keys(dataRow).forEach((key: string) => {
          if (dataOnline[key]) {
            dataRow[key] = dataOnline[key][dataRow[key]];
          } else if (dataRow[key] === "&nbsp;") {
            dataRow[key] = "";
          } else {
            dataRow[key] = cellValueMask(dataRow[key], key);
          }
        });
      });

      setData(dataOnline.formAtual);
      setDataBackup(dataOnline.formAtual);
    });

    const dataSet: Set<string> = new Set(
      Object.keys(params).map((colKey) => colKey)
    );
    setColTableBackup(dataSet);
    console.log("Data loaded!");

    const colVisArray: string[] = [];

    Object.keys(params).forEach((colKey) => {
      !params[colKey].isVisible && colVisArray.push(colKey);
    });
    console.log("ln 83", colVisArray);

    setColVisibility(colVisArray);
  }, []);

  useEffect(() => {
    const colData: string[] = [];
    const colVisibilityTemp = new Set(colVisibility);
    const lockedColTableTemp = lockedColTable;

    Object.keys(params).forEach((colKey) => {
      if (colVisibilityTemp.has(colKey)) {
        lockedColTableTemp.delete(colKey);
      } else {
        if (!lockedColTableTemp.has(colKey)) {
          colData.push(colKey);
        }
      }
    });

    console.log("ln 108", colVisibilityTemp);
    console.log("ln 109", colData, lockedColTableTemp);

    setColTable(new Set(colData));
    setLockedColTable(lockedColTableTemp);
  }, [colVisibility]);

  useEffect(() => {
    handleFilterSearch(routeParams);
  }, [routeParams]);

  function loadData() {
    return fetch("https://www.caae.org.br/teste/testeDatav2.json?n=1")
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  function handleLockedTable(colKey: string) {
    let lockedColTableTemp = new Set(lockedColTable);
    let colTableBackupTemp = new Set(colTableBackup);
    let colVisibilityTemp = new Set(colVisibility);

    if (lockedColTableTemp.has(colKey)) {
      lockedColTableTemp.delete(colKey);
    } else {
      lockedColTableTemp.add(colKey);
    }

    colVisibility.forEach((key) => colTableBackupTemp.delete(key));
    lockedColTableTemp.forEach((key) => colTableBackupTemp.delete(key));

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

  function handleBar() {
    if (Array.from(lockedColTable).length <= 0) {
      return "none";
    } else {
      return;
    }
  }

  function handleSizeTable() {
    if (Array.from(colTable).length <= 0) {
      return 0;
    }
    if (
      Array.from(colTable).length === 1 &&
      params[Array.from(colTable)[0]].tableWidth < 200
    ) {
      return params[Array.from(colTable)[0]].tableWidth;
    }
  }

  function accentRemove(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function cellValueMask(value: string, colKey: string) {
    const mask = params[colKey].masks ? params[colKey].masks : false;

    if (mask) {
      const cleanValue = value.replace(/\D/g, "");
      for (let i = 0; i < mask.length; i++) {
        if (cleanValue.length >= Number(mask[i][2])) {
          return cleanValue.replace(mask[i][0], mask[i][1]);
        }
      }
    }

    return value;
  }

  function handleGlobalSearch() {
    if (searchWord === "") {
      setData(dataBackup);
      return;
    }

    const filteredData: DataRow[] = [];
    dataBackup.forEach((row) => {
      const filteredRow: string[] = [];
      (Object.keys(row) as Array<keyof DataRow>).forEach((colKey) => {
        const cellValue = row[colKey] as string;
        if (
          cellValue !== "" &&
          cellValue !== null &&
          accentRemove(cellValue).includes(accentRemove(searchWord))
        ) {
          filteredRow.push(cellValue);
        }
      });

      filteredRow.length > 0 && filteredData.push(row);
    });
    setData(filteredData);
  }

  function handleFilterSearch(filters: any) {
    if (filters && filters.formData) {
      let filteredDataForm = filters.formData;
      const filteredData: DataRow[] = [];

      dataBackup.forEach((row: any) => {
        const filteredRow: string[] = [];
        Object.keys(filteredDataForm).forEach((colKey) => {
          if (
            accentRemove(row[colKey]).includes(
              accentRemove(filteredDataForm[colKey])
            )
          ) {
            filteredRow.push(row[colKey]);
          }
        });
        if (filteredRow.length === Object.keys(filteredDataForm).length) {
          filteredData.push(row);
        }
      });
      setData(filteredData);
    } else {
      setData(dataBackup);
    }
  }

  function handleResetTable() {
    setSearchWord("");
    setRouteParams({});
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <View style={styles.container}>
        <View style={styles.serchBar}>
          <TextInput
            style={styles.input}
            placeholder="Pesquise..."
            value={searchWord}
            onChangeText={(e) => setSearchWord(e.trimStart())}
          />
          <Pressable
            style={styles.searchIcon}
            onPress={() => handleGlobalSearch()}
          >
            <FontAwesome name="search" size={24} color="white" />
          </Pressable>
          <Pressable
            style={styles.filterIcon}
            onPress={() => navigation.navigate("FilterModal", route.params)}
          >
            <FontAwesome name="filter" size={24} color="white" />
          </Pressable>
          <Pressable
            style={{ ...styles.filterIcon, backgroundColor: "red" }}
            onPress={() => handleResetTable()}
          >
            <MaterialCommunityIcons name="broom" size={24} color="white" />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            console.log("tabela de pedidos", dataBackup[0]);
          }}
        >
          <Text style={styles.text}>Tabela de Pedidos</Text>
        </Pressable>

        <View style={styles.table}>
          <ScrollView
            horizontal={true}
            style={{ minWidth: handleSizeLockedTable() }}
            showsHorizontalScrollIndicator={false}
          >
            <Table>
              <TableWrapper style={styles.header}>
                {Array.from(lockedColTable).map((colKey, colIndex) => (
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
                ))}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={0}
                showsVerticalScrollIndicator={false}
              >
                {data.map((rowData, rowIndex) => {
                  return (
                    <TableWrapper key={rowIndex} style={styles.header}>
                      {(Array.from(lockedColTable) as Array<keyof DataRow>).map(
                        (colKey, colIndex) => (
                          <Cell
                            key={colIndex}
                            data={rowData[colKey]}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        )
                      )}
                    </TableWrapper>
                  );
                })}
              </SyncedScrollView>
            </Table>
          </ScrollView>
          <View
            style={{ backgroundColor: "black", width: 3, display: handleBar() }}
          ></View>

          <ScrollView
            horizontal={true}
            style={{ minWidth: handleSizeTable() }}
            showsHorizontalScrollIndicator={false}
          >
            <Table>
              <TableWrapper style={styles.header}>
                {Array.from(colTable).map((colKey, colIndex) => (
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
                ))}
              </TableWrapper>
              <SyncedScrollView
                scrollViewId={1}
                showsVerticalScrollIndicator={false}
              >
                {data.map((rowData, rowIndex) => {
                  return (
                    <TableWrapper key={rowIndex} style={styles.header}>
                      {(Array.from(colTable) as Array<keyof DataRow>).map(
                        (colKey, colIndex) => (
                          <Cell
                            key={colIndex}
                            data={rowData[colKey]}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        )
                      )}
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
    color: "#ffffff",
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
    maxWidth: "95%",
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
