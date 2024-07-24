// import * as React from "react";
// import { ScrollView, Text } from "react-native";
// import { styles } from "../constants/styles";
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';

// export default function ModuleList ({moduleName}:any) {
//   return (
//     <ScrollView contentContainerStyle={styles.containerScrollView}>
//       <Text style={styles.inputLabel}>Listagem {moduleName}</Text>
//     </ScrollView>
//   )
// }

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Table, Row } from "react-native-reanimated-table";
import { styles, stylesTable } from "../constants/styles";
import { modulesParam } from "../constants/moduleParam";

export default class ExampleThree extends Component {
  constructor(props: any) {
    const tableHead: any = [];
    const widthArr: any = [];
    Object.keys(modulesParam["cliente"].formParam).map((moduleObject) => {
      modulesParam["cliente"].formParam[moduleObject].label &&
        tableHead.push(modulesParam["cliente"].formParam[moduleObject].label) &&
        widthArr.push(100);
    });
    console.log(tableHead);

    super(props);
    this.state = {
      tableHead: tableHead,
      widthArr: widthArr,
    };
  }

  render() {
    const state: any = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 20; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
      <View
        style={{
          ...styles.containerScrollView,
          paddingTop: 30,
        }}
      >
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={stylesTable.header}
                textStyle={stylesTable.headerText}
              />
            </Table>
            <ScrollView style={stylesTable.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => {
                  let oddRow = false;
                  index % 2 && (oddRow = true);
                  return (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={oddRow ? stylesTable.rowOdd : stylesTable.row}
                      textStyle={stylesTable.text}
                    />
                  );
                })}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
