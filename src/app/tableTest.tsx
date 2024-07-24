import React, { Component, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Cell, Row, Rows, Table, TableWrapper } from "react-native-reanimated-table";
import { stylesTable } from "../constants/styles";

export default function TableTest() {
  const state = {
    tableHead: ["Head1", "Head2", "Head3", "Head4"],
    tableData: [
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
      ["01", "02", "03", "04"],
      ["11", "12", "13", "14"],
      ["21", "22", "23", "24"],
      ["31", "32", "33", "34"],
    ],
  };

  const [header, setHeader] = useState(state.tableHead);
  const [data, setData] = useState(state.tableData);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    let updatedHeader = state.tableHead;
    let updatedData = state.tableData;

    filter.forEach((element) => {
      let index = filter.indexOf(element);
      updatedHeader = updatedHeader.filter((head) => head !== filter[index]);
      data.forEach((row) => {
        updatedData = updatedData.filter((item) => item[index] !== row[index]);
      });
    });

    setHeader(updatedHeader);
    setData(updatedData);
  }, [filter]);

  function handleFilter(col: string) {
    if (!filter.includes(col)) {
      setFilter([...filter, col]);
    } else {
      setFilter(filter.filter((item) => item !== col));
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hellow World!</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable style={styles.button} onPress={() => handleFilter("Head1")}>
          <Text style={styles.buttonText}>Head1</Text>
        </Pressable>
        <Pressable style={{...styles.button}} onPress={() => handleFilter("Head2")}>
          <Text style={styles.buttonText}>Head2</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleFilter("Head3")}>
          <Text style={styles.buttonText}>Head3</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleFilter("Head4")}>
          <Text style={styles.buttonText}>Head4</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row" }}>
        {filter.map((item) => (
          <Text>{item}</Text>
        ))}
      </View>
      <TableWrapper>
        <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
          <Row data={header} style={styles.head} textStyle={styles.text} />
        </Table>
        <ScrollView style={stylesTable.dataWrapper}>
          <Table borderStyle={{ borderColor: "black", borderWidth: 1 }}>
            {
            state.tableData.map((rowData,index)=>(
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex)=>(
                    <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={cellIndex === 3 && {display: "none"}}/>
                  ))
                }
              </TableWrapper>
            ))
            }
            {/* <Rows data={data} textStyle={styles.text} /> */}
          </Table>
        </ScrollView>
      </TableWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
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
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
});
