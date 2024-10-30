// {Object.keys(formParam).map((field) => (
//   <View
//     key={field}
//     style={{
//       margin: 6,
//       borderWidth: 1,
//       borderColor: "blue",
//       alignItems: "center",
//     }}
//   >
//     {/* {formParam[field].label && (
// <View
// style={{
// margin: 2,
// flexDirection: "row",
// justifyContent: "space-between",
// alignItems: "center",
// width: "100%",
// borderWidth: 1,
// borderColor: "grey",
// }}
// >
// <TextRN style={styles.inputLabel}>
// {formParam[field].label}
// {formParam[field].isRequired && "*"}
// </TextRN>
// {formMode === "filter" && (
// <View style={{ flexDirection: "row" }}>
//   {formParam[field].isVisible && (
//     <Pressable
//       style={{
//         height: 22,
//         width: 22,
//         backgroundColor: "green",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 6,
//       }}
//       onPress={() => {
//         handleVisibilityChange(field);
//       }}
//     >
//       <Ionicons name="eye" size={15} color="white" />
//     </Pressable>
//   )}
//   {!formParam[field].isVisible && (
//     <Pressable
//       style={{
//         height: 22,
//         width: 22,
//         backgroundColor: "red",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 6,
//       }}
//       onPress={() => {
//         handleVisibilityChange(field);
//       }}
//     >
//       <Ionicons name="eye-off" size={15} color="white" />
//     </Pressable>
//   )}
// </View>
// )}
// </View>
// )} */}

//     {formParam[field].errorMsg && (
//       <Text style={styles.errorMsg}>{formParam[field].errorMsg}</Text>
//     )}
//     <View style={{ flexDirection: "row" }}>
//       {formParam[field].inputType === "input" && (
//         <Input
//           field={formParam[field]}
//           onValueChange={(e: any, fillForm: any, errorMsg: any) =>
//             callFather(e, field)
//           }
//           classes={classes}
//         />
//       )}
//       {formParam[field].inputType === "select" && (
//         <Select
//           field={formParam[field]}
//           classes={classes}
//           onValueChange={(e: any) => callFather(e, field)}
//         />
//       )}
//       {formParam[field].inputType === "multiSelect" && (
//         <MultiSelect
//           classes={classes}
//           field={formParam[field]}
//           onValueChange={(e: any) => callFather(e, field)}
//         />
//       )}
//       {formParam[field].inputType === "boolean" && (
//         <Boolean
//           classes={classes}
//           field={formParam[field]}
//           onValueChange={(e: any) => callFather(e, field)}
//         />
//       )}
//       {formParam[field].inputType === "textBox" && (
//         <TextBox
//           field={formParam[field]}
//           classes={classes}
//           onValueChange={(e: any) => callFather(e, field)}
//         />
//       )}
//       {formParam[field].inputType === "date" && dateInput(field)}
//       {formParam[field].inputType === "file" && (
//         <File
//           field={formParam[field]}
//           onValueChange={(e: any) => callFather(e, field)}
//           classes={classes}
//         />
//       )}
//       {formParam[field].inputType === "grid" && (
//         <Grid
//           field={formParam[field]}
//           onValueChange={(e: any) => callFather(e, field)}
//           classes={classes}
//         />
//       )}
//       {formParam[field].inputType === "table" && (
//         <Table
//           moduleParam={formParam[field].table}
//           classes={classes}
//           urlParam={formParam[field].table.tableSettings?.tableURL}
//           onValueChange={(e: any, whichTable: string) => {
//             callFatherTable(e, field, whichTable);
//           }}
//         />
//       )}
//       {formParam[field].inputType === "button" && (
//         <Button
//           field={formParam[field]}
//           classes={classes}
//           onPress={() => {
//             callFatherButton(field);
//           }}
//         />
//       )}
//       {formParam[field].inputType === "image" && (
//         <Image
//           field={formParam[field]}
//           classes={classes}
//           setToken={(e: any) => setToken(e, field)}
//         />
//       )}
//       {formParam[field].inputType === "text" && (
//         <Text field={formParam[field]} classes={classes} />
//       )}
//       {/* {formParam[field].inputType === "video" && (
// <Video field={formParam[field]} classes={classes} />
// )} */}
//       {formParam[field].inputType === "sound" && (
//         <Sound field={formParam[field]} classes={classes} />
//       )}

//       {formParam[field].searchSign && (
//         <Pressable
//           style={{
//             height: 30,
//             width: 30,
//             backgroundColor: "red",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onPress={() => onChangeSign(field)}
//         >
//           <FontAwesome5
//             name={formParam[field].searchSign}
//             size={18}
//             color="white"
//           />
//         </Pressable>
//       )}

//       {formParam[field].function &&
//         formParam[field].inputType !== "button" && (
//           <Pressable
//             style={{
//               height: 30,
//               width: 30,
//               backgroundColor: "red",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onPress={() => callFatherButton(field)}
//           >
//             <FontAwesome5 name="circle" size={18} color="white" />
//           </Pressable>
//         )}
//     </View>
//   </View>
// ))}