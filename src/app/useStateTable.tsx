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

type Columns = Record<ColumnKey, ColumnStyle>;

export default function UseStateTable() {

  const [lock, setLock] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);

  const [filterWord, setFilterWord] = useState("");
  const [globalFilterWord, setGlobalFilterWord] = useState("");
  
  const [tableData, setTableData] = useState<string[][]>([]);
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [tableDataBackup, setTableDataBackup] = useState<string[][]>([]);
  
  const colums: Columns = StyleSheet.create({
    ["appTableColLock"]: { display: "none" },
  });

  useEffect(() => {
    const head: string[] = [];
    Object.keys(modulesParam.pedido.formParam).map((param: string) => {
      modulesParam.pedido.formParam[param].label &&
        head.push(modulesParam.pedido.formParam[param].label);
    });

    setTableHead(head);

    const data: string[][] = [];
    for (let i = 0; i < 30; i++) {
      const row: string[] = [];
      for (let n = 0; n < head.length; n++) {
        row.push(`${i}${n}`);
      }
      data.push(row);
    }
    setTableData(data);
    setTableDataBackup(data);
  }, []);

  useEffect(() => {
    // Handle global filter when it changes
    if (globalFilterWord !== "") {
      handleFilterWord();
    }
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
      const filteredData: string[][] = [];
      tableDataBackup.forEach((row) => {
        const filteredRow = row.filter((word) =>
          word.toLowerCase().includes(filterWord.toLowerCase())
        );

        if (filteredRow.length !== 0) {
          filteredData.push(row);
        }
      });
      setTableData(filteredData);
    } else {
      setTableData(tableDataBackup);
    }
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <View style={{ ...styles.container, backgroundColor: "grey" }}>
        <Pressable
          style={{ ...styles.buttonSrc, backgroundColor: "red" }}
          onPress={() => {
            console.log("pressed");
            // Avoid calling renderTable directly as it could cause re-renders
            const data: string[][] = [];
            for (let i = 0; i < 30; i++) {
              const row: string[] = [];
              for (let n = 0; n < tableHead.length; n++) {
                row.push(`${i}${n}`);
              }
              data.push(row);
            }
            setTableData(data);
            setTableDataBackup(data);
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
            {tableHead.map((colHeadData, colHeadIndex) => (
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
          <TableWrapper style={colums.appTableColLock}>
            <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
              <TableWrapper style={{ ...styles.row, ...styles.head }}>
                <Cell
                  key={"lockedCol"}
                  data={tableHead[0]}
                  textStyle={styles.text}
                  style={{ width: 70 }}
                />
              </TableWrapper>
            </Table>
            <SyncedScrollView scrollViewId={0} style={stylesTable.dataWrapper}>
              <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
                {tableData &&
                  tableData.map((rowData, index) => (
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
                  {tableHead.map((cellData, cellIndex) => (
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
                  {tableData.map((rowData, index) => (
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
        </View>
      </View>
    </SyncedScrollViewContext.Provider>
  );
}

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
