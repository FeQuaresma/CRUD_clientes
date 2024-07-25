import React, { Component, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Cell,
  Row,
  Rows,
  Table,
  TableWrapper,
} from "react-native-reanimated-table";
import { stylesTable } from "../constants/styles";
import { modulesParam } from "../constants/moduleParam";

type ColumnKey = `appTableCol${number | string}`;

type ColumnStyle = {
  display?: "none";
};

type StateTable = {
  tableHead: string[];
  tableData: [string[]];
  tableWidth?: [];
};

type Columns = Record<ColumnKey, ColumnStyle>;

export default function TableTest() {
  const state: StateTable = {
    tableHead: [],
    tableData: [[]],
    tableWidth: [],
  };

  Object.keys(modulesParam.cliente.formParam).map((param: string) => {
    modulesParam.cliente.formParam[param].label &&
      state.tableHead.push(modulesParam.cliente.formParam[param].label);
  });

  for (let i = 0; i < 30; i++) {
    state.tableData[i] = [];
    for (let n = 0; n < state.tableHead.length; n++) {
      state.tableData[i][n] = `${i}${n}`;
    }
  }

  const [filter, setFilter] = useState<string[]>([]);
  const [lock, setLock] = useState<boolean>(false);

  useEffect(() => {
    state.tableHead.map((col, index) => {
      let newStyleName: ColumnKey = `appTableCol${index}`;
      colums[newStyleName] = {};
    });
  }, []);

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

  return (
    <View style={{ ...styles.container, backgroundColor: "grey" }}>
      <Text>Hello World!</Text>

      <Pressable style={styles.button} onPress={() => handleLock()}>
        <Text style={styles.buttonText}>Lock</Text>
      </Pressable>

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

      <View style={{ flexDirection: "row" }}>
        {filter.map((item, index) => (
          <Text key={index}>{item} </Text>
        ))}
      </View>

      {/* <View style={styles.row}> */}
      <ScrollView contentContainerStyle={styles.row} nestedScrollEnabled={true}>
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
          <ScrollView style={stylesTable.dataWrapper}>
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
          </ScrollView>
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
                    style={{ ...colums[`appTableCol${cellIndex}`], width: 70 }}
                  />
                ))}
              </TableWrapper>
            </Table>

            <ScrollView style={stylesTable.dataWrapper}>
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
            </ScrollView>
          </TableWrapper>
        </ScrollView>
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

const colums: Columns = StyleSheet.create({
  ["appTableColLock"]: { display: "none" },
});

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: "#fff" },
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
});
