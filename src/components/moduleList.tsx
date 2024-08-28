import * as React from "react";
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
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "../context/SyncedScrollViewContext";
import { SyncedScrollView } from "../components/SyncedScrollView";
import { isWithinInterval, parseISO } from "date-fns";

type DataRow = {
  [key: string]: string;
};

type DataTable = {
  formAtual: DataRow[];
  [key: string]: any;
};

export default function ModuleList({ navigation, route, moduleParam, urlParam}: any) {
  const [params, setParams] = useState(
    moduleParam.tableParam ? moduleParam.tableParam : {}
  );
  const [data, setData] = useState<DataRow[]>([]);
  const [dataOrigin, setDataOrigin] = useState<DataRow[]>([]);

  const [searchWord, setSearchWord] = useState("");
  const [lockedColTable, setLockedColTable] = useState<Set<string>>(new Set());
  const [colTable, setColTable] = useState<Set<string>>(new Set());
  const [colTableOrigin, setColTableOrigin] = useState<Set<string>>();

  const [colVisibility, setColVisibility] = useState<string[]>([]);
  const [routeParams, setRouteParams] = useState({});

  const [footer, setFooter] = useState<Boolean>(false);

  useEffect(() => {
    if (route.params?.formData) {
      setRouteParams(route.params.formData);
    }
    if (route.params?.colVisibility) {
      setColVisibility(route.params.colVisibility);
    }
  }, [route.params]);

  useEffect(() => {
    loadData().then((dataOnline: DataTable) => {
      dataOnline.formAtual.forEach((dataRow: DataRow) => {
        Object.keys(dataRow).forEach((key: string) => {
          if (dataOnline[key]) {
            dataRow[key] = dataOnline[key][dataRow[key]];
          } else if (dataRow[key] === "&nbsp;") {
            dataRow[key] = "";
          }
        });
      });

      setData(dataOnline.formAtual);
      setDataOrigin(dataOnline.formAtual);
    });

    const dataSet: Set<string> = new Set(
      Object.keys(params).map((colKey) => colKey)
    );
    setColTableOrigin(dataSet);
    console.log("Data loaded!");

    const colVisArray: string[] = [];

    Object.keys(params).forEach((colKey) => {
      !params[colKey].isVisible && colVisArray.push(colKey);
    });

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

    setColTable(new Set(colData));
    setLockedColTable(lockedColTableTemp);
  }, [colVisibility]);

  useEffect(() => {
    handleFilterSearch(routeParams);
  }, [routeParams]);

  useEffect(() => {
    Object.keys(params).forEach((key) => {
      if (!footer && params[key].footerLabel) {
        setFooter(true);
      }
      switch (params[key].footerLabel?.function) {
        case "sumTotal":
          let sumTotal = 0;

          data.forEach((row) => {
            sumTotal += Number(row[key]);
          });
          setParams((prevParam: any) => ({
            ...prevParam,
            [key]: {
              ...prevParam[key],
              footerLabel: {
                function: "sumTotal",
                value: String(sumTotal.toFixed(2)),
              },
            },
          }));
          break;
        case "sumEntries":
          setParams((prevParam: any) => ({
            ...prevParam,
            [key]: {
              ...prevParam[key],
              footerLabel: {
                function: "sumEntries",
                value: String(data.length),
              },
            },
          }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  function loadData() {
    return fetch(urlParam)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  function handleLockedTable(colKey: string) {
    let lockedColTableTemp = new Set(lockedColTable);
    let colTableOriginTemp = new Set(colTableOrigin);
    let colVisibilityTemp = new Set(colVisibility);

    if (lockedColTableTemp.has(colKey)) {
      lockedColTableTemp.delete(colKey);
    } else {
      lockedColTableTemp.add(colKey);
    }

    colVisibility.forEach((key) => colTableOriginTemp.delete(key));
    lockedColTableTemp.forEach((key) => colTableOriginTemp.delete(key));

    setColTable(colTableOriginTemp);
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
    if (params[colKey]) {
      const mask = params[colKey].cellMasks
        ? params[colKey].cellMasks
        : params[colKey].masks
        ? params[colKey].masks
        : false;

      if (mask && value !== undefined) {
        console.log("ln 223", value)
        const cleanValue = value.replace(/\D/g, "");
        for (let i = 0; i < mask.length; i++) {
          if (cleanValue.length >= Number(mask[i][2])) {
            return cleanValue.replace(mask[i][0], mask[i][1]);
          }
        }
      }
    }
    return value;
  }

  function formatCurrency(value: string): string {
    // Remove todos os caracteres que não forem números, ponto ou vírgula
    value = value.replace(/[^\d.,]/g, "");

    // Verifica se o valor possui mais de um ponto ou mais de uma vírgula
    const countDot = (value.match(/\./g) || []).length;
    const countComma = (value.match(/,/g) || []).length;

    if (countDot > 1 || countComma > 1) {
      // Remove todos os pontos e vírgulas, retornando apenas os números
      return value.replace(/[.,]/g, "");
    }

    // Separa o valor em duas partes: antes e depois do último ponto ou vírgula
    const lastSeparator = Math.max(
      value.lastIndexOf("."),
      value.lastIndexOf(",")
    );

    if (lastSeparator !== -1) {
      const integerPart = value
        .substring(0, lastSeparator)
        .replace(/[^0-9]/g, "");
      const decimalPart = value
        .substring(lastSeparator + 1)
        .replace(/[^0-9]/g, "");
      return `${integerPart}.${decimalPart}`;
    }

    // Se não houver ponto ou vírgula, retornar o valor sem modificações
    return value.replace(/[^0-9]/g, "");
  }

  function handleGlobalSearch() {
    if (searchWord === "") {
      setData(dataOrigin);
      return;
    }

    let cleanSearchWord = searchWord.replace(/\D/g, "");

    const filteredData: DataRow[] = [];

    dataOrigin.forEach((row) => {
      const filteredRow: string[] = [];

      (Object.keys(row) as Array<keyof DataRow>).forEach((colKey: any) => {
        if (params[colKey]) {
          const cellValue = row[colKey] as string;
          let cleanCellValue = cellValue.replace(/\D/g, "");

          if (cellValue !== "" && cellValue !== null) {
            if (params[colKey].isNumber && cleanSearchWord !== "") {
              if (searchWord[0] === "<" || searchWord[0] === ">") {
                let cleanSearchParam = searchWord.split("");
                cleanSearchParam.shift();

                if (
                  searchWord[0] === "<" &&
                  Number(row[colKey]) <= Number(cleanSearchParam.join(""))
                ) {
                  console.log(cleanSearchParam.join(""), row[colKey]);
                  console.log("true");
                  filteredRow.push(row[colKey]);
                }

                if (
                  searchWord[0] === ">" &&
                  Number(row[colKey]) >= Number(cleanSearchParam.join(""))
                ) {
                  console.log(cleanSearchParam.join(""), row[colKey]);
                  console.log("true");
                  filteredRow.push(row[colKey]);
                }
              } else if (params[colKey].searchParam) {
                // CPF, CNPJ, DATA
                params[colKey].searchParam.forEach((mask:any) => {
                  if (
                    cleanCellValue
                      .replace(mask[0], mask[1])
                      .includes(cleanSearchWord)
                  ) {
                    filteredRow.push(cellValue);
                  }
                });
              } else if (params[colKey].isCurrency) {
                // Dinheiro
                let currencySeachWord = formatCurrency(searchWord);
                if (cellValue.includes(currencySeachWord)) {
                  filteredRow.push(cellValue);
                }
              } else if (cellValue.includes(cleanSearchWord)) {
                filteredRow.push(cellValue);
              }
            } else if (
              accentRemove(cellValue).includes(accentRemove(searchWord))
            ) {
              filteredRow.push(cellValue);
            }
          }
        }
      });

      filteredRow.length > 0 && filteredData.push(row);
    });

    setData(filteredData);
  }

  function handleFilterSearch(filters?: any) {
    if (filters && Object.keys(filters).length > 0) {
      let filteredDataForm = filters;
      const filteredData: DataRow[] = [];

      dataOrigin.forEach((row: any) => {
        const filteredRow: string[] = [];
        Object.keys(filteredDataForm).forEach((colKey) => {
          if (filteredDataForm[colKey] !== null) {
            if (typeof filteredDataForm[colKey] === "string") {
              if (
                filteredDataForm[colKey][0] === "<" ||
                filteredDataForm[colKey][0] === ">"
              ) {
                let cleanSearchParam = filteredDataForm[colKey].split("");
                cleanSearchParam.shift();

                if (
                  filteredDataForm[colKey][0] === "<" &&
                  Number(row[colKey]) <= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }

                if (
                  filteredDataForm[colKey][0] === ">" &&
                  Number(row[colKey]) >= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }
              } else if (
                accentRemove(row[colKey]).includes(
                  accentRemove(filteredDataForm[colKey])
                )
              ) {
                filteredRow.push(row[colKey]);
              }
            } else if (typeof filteredDataForm[colKey] === "object") {
              const date = parseISO(row[colKey]);
              const interval = {
                start: parseISO(
                  filteredDataForm[colKey].start !== ""
                    ? filteredDataForm[colKey].start
                    : "0001-01-01"
                ),
                end: parseISO(
                  filteredDataForm[colKey].end !== ""
                    ? filteredDataForm[colKey].end
                    : "9999-01-01"
                ),
              };

              if (isWithinInterval(date, interval)) {
                filteredRow.push(row[colKey]);
              }
            }
          }
        });
        if (filteredRow.length === Object.keys(filteredDataForm).length) {
          filteredData.push(row);
        }
      });
      setData(filteredData);
    } else {
      setData(dataOrigin);
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
            onSubmitEditing={() => handleGlobalSearch()}
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
            console.log("tabela de pedidos", routeParams);
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
                            data={cellValueMask(
                              rowData[colKey],
                              colKey as string
                            )}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        )
                      )}
                    </TableWrapper>
                  );
                })}
              </SyncedScrollView>

              {footer ? (
                <TableWrapper style={styles.footer}>
                  {Array.from(lockedColTable).map((colKey, colIndex) => (
                    <Cell
                      key={colIndex}
                      data={
                        params[colKey].footerLabel
                          ? cellValueMask(
                              params[colKey].footerLabel.value,
                              colKey
                            )
                          : ""
                      }
                      style={styles.cellFoot}
                      textStyle={styles.cellHeadText}
                      width={params[colKey].tableWidth}
                    />
                  ))}
                </TableWrapper>
              ) : (
                <></>
              )}
            </Table>
          </ScrollView>
          <View
            style={{ backgroundColor: "black", width: 3, display: handleBar() }}
          ></View>
          {/*Divisória*/}
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
                            data={cellValueMask(
                              rowData[colKey],
                              colKey as string
                            )}
                            style={styles.cellData}
                            width={params[colKey].tableWidth}
                          />
                        )
                      )}
                    </TableWrapper>
                  );
                })}
              </SyncedScrollView>
              {footer ? (
                <TableWrapper style={styles.footer}>
                  {Array.from(colTable).map((colKey, colIndex) => (
                    <Cell
                      key={colIndex}
                      data={
                        params[colKey].footerLabel
                          ? cellValueMask(
                              params[colKey].footerLabel.value,
                              colKey
                            )
                          : ""
                      }
                      style={styles.cellFoot}
                      textStyle={styles.cellHeadText}
                      width={params[colKey].tableWidth}
                    />
                  ))}
                </TableWrapper>
              ) : (
                <></>
              )}
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
  cellFoot: {
    backgroundColor: "#919ba9",
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
  footer: {
    flexDirection: "row",
  },
  tableLeft: {},
  tableRight: {},
});
