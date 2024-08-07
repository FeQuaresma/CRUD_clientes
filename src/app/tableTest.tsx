import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import { stylesTable } from "../constants/styles";
import { modulesParam } from "../constants/moduleParam";
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "../context/SyncedScrollViewContext";
import { SyncedScrollView } from "../components/SyncedScrollView";

type ColumnKey = `appTableCol${number | string}`;

type ColumnStyle = {
  display?: "none";
};

type StateTable = {
  tableHead: string[];
  tableData: [string[]];
  tableDataBackup: [string[]];
  tableWidth?: [];
};

type Columns = Record<ColumnKey, ColumnStyle>;

export default function TableTest() {
  const [lock, setLock] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);
  const [filterWord, setFilterWord] = useState("");
  const [globalFilterWord, setGlobalFilterWord] = useState("");
  // const [tableHead, setTableHead] = useState<string[]>([]);
  // const [tableData, setTableData] = useState<string[][]>([]);
  // const [tableHeadBackup, setTableHeadBackup] = useState<string[][]>([]);
  // const [tableWidth, setTableWidth] = useState();

  const state: StateTable = {
    tableHead: [],
    tableData: [[]],
    tableDataBackup: [[]],
    tableWidth: [],
  };

  function renderHead() {
    let head: string[] = [];
    Object.keys(modulesParam.pedido.formParam).map((param: string) => {
      modulesParam.pedido.formParam[param].label &&
        head.push(modulesParam.pedido.formParam[param].label);
    });
    state.tableHead = head;
  }
  renderHead();

  function renderTable() {
    for (let i = 0; i < 30; i++) {
      state.tableData[i] = [];
      for (let n = 0; n < state.tableHead.length; n++) {
        state.tableData[i][n] = `${i}${n}`;
      }
    }
    state.tableDataBackup = state.tableData;
  }
  renderTable()

  useEffect(() => {
    state.tableHead.map((_, index) => {
      let newStyleName: ColumnKey = `appTableCol${index}`;
      colums[newStyleName] = {};
    });
  }, []);

  useEffect(() => {
    if (globalFilterWord !== "") {
      handleFilterWord();
    }
    console.log(state.tableData);
  }, [globalFilterWord]);

  function handleFilter(col: ColumnKey) {
    if (colums[col] === colums.appTableCol0 && lock === true) {
      console.log("error");
      console.log(lock);
      return;
    }

    colums[col].display !== "none"
      ? (colums[col] = { display: "none" })
      : (colums[col] = {});

    if (!filter.includes(col)) {
      setFilter([...filter, col]);
    } else {
      setFilter(filter.filter((item) => item !== col));
    }
  }

  function handleLock() {
    console.log(colums.appTableColLock.display);
    if (!colums.appTableCol0.display || lock) {
      if (colums.appTableColLock.display !== "none") {
        colums.appTableColLock = { display: "none" };
        colums.appTableCol0 = {};
        setLock(false);
      } else {
        colums.appTableColLock = {};
        colums.appTableCol0 = { display: "none" };
        setLock(true);
      }
    }
  }

  function handleFilterWord() {
    if (filterWord != "") {
      state.tableData = [[]];
      let index = 0;
      let filterWordLower = filterWord.toLowerCase();
      state.tableDataBackup.forEach((row) => {
        let rowString = row.join("").toLowerCase();
        console.log(rowString);
        if (rowString.includes(filterWordLower)) {
          state.tableData[index] = row;
          index += 1;
        } else {
          return;
        }
      });
    }
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <View style={{ ...styles.container}}>
        <Pressable
          style={{ ...styles.buttonSrc, backgroundColor: "red" }}
          onPress={() => {
            console.log("pressed");
            renderTable();
          }}
        >
          <Text style={{ color: "white" }}>Render Table</Text>
        </Pressable>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.input}
            value={filterWord}
            onChangeText={(e) => {
              setFilterWord(e);
            }}
          />
          <Pressable
            style={styles.buttonSrc}
            onPress={() => setGlobalFilterWord(filterWord)}
          >
            <Text style={{ color: "white" }}>Pesq</Text>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={() => handleLock()}>
          <Text style={styles.buttonText}>Lock</Text>
        </Pressable>

        <View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row",
            }}
          >
            {state.tableHead.map((colHeadData, colHeadIndex) => (
              <Pressable
                key={colHeadIndex}
                style={styles.button}
                onPress={() => handleFilter(`appTableCol${colHeadIndex}`)}
              >
                <Text style={styles.buttonText}>{colHeadData}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ flexDirection: "row" }}>
          {filter.map((item, index) => (
            <Text key={index}>{item} </Text>
          ))}
        </View>

        <View style={{ height: "70%", flexDirection: "row" }}>
          {/* <ScrollView contentContainerStyle={styles.row} nestedScrollEnabled={true}> */}

          <TableWrapper style={colums.appTableColLock}>
            <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
              <TableWrapper style={{ ...styles.row, ...styles.head }}>
                <Cell
                  key={"lockedCol"}
                  data={state.tableHead[0]}
                  textStyle={styles.text}
                  style={{ width: 70 }}
                />
              </TableWrapper>
            </Table>
            <SyncedScrollView scrollViewId={0} style={stylesTable.dataWrapper}>
              <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
                {state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    <Cell
                      key={index}
                      data={rowData[0]}
                      textStyle={styles.text}
                      style={{
                        width: 70,
                      }}
                    />
                  </TableWrapper>
                ))}
              </Table>
            </SyncedScrollView>
          </TableWrapper>

          <ScrollView horizontal={true}>
            <TableWrapper>
              <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
                <TableWrapper style={{ ...styles.row, ...styles.head }}>
                  {state.tableHead.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={cellData}
                      textStyle={styles.text}
                      style={{
                        ...colums[`appTableCol${cellIndex}`],
                        width: 70,
                      }}
                    />
                  ))}
                </TableWrapper>
              </Table>

              <SyncedScrollView
                scrollViewId={1}
                style={stylesTable.dataWrapper}
              >
                <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
                  {state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                      {rowData.map((cellData, cellIndex) => (
                        <Cell
                          key={cellIndex}
                          data={cellData}
                          textStyle={styles.text}
                          style={{
                            ...colums[`appTableCol${cellIndex}`],
                            width: 70,
                          }}
                        />
                      ))}
                    </TableWrapper>
                  ))}
                </Table>
              </SyncedScrollView>
            </TableWrapper>
          </ScrollView>
          {/* </ScrollView> */}
        </View>
      </View>
    </SyncedScrollViewContext.Provider>
  );
}

const colums: Columns = StyleSheet.create({
  ["appTableColLock"]: { display: "none" },
});

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: "#fff", flex: 1 },
  head: { height: 60, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 80,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 3,
  },
  buttonSrc: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,

    margin: 12,
    padding: 10,
  },
});
