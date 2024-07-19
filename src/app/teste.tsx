import React, { useState, useContext, createContext } from "react";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Pressable, Text, View } from "react-native";
import { InfoProvider, useInfo } from "./useInfo";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function ViewText({ navigation }:any) {
  const routes = useNavigationState(state => state);
  
  // const { info, setInfo }:any = useInfo();
  return (
    <View style={{flex: 1, alignContent: "center", justifyContent: "center"}}>
      <Text>Header</Text>
      {/* <Pressable onPress={() => setInfo("Teste")} style={{backgroundColor: "red" }}><Text style={{color: "white"}}>Enviar informação</Text></Pressable> */}
      <Pressable onPress={() => console.log(routes)} style={{backgroundColor: "blue"}}><Text style={{color: "white"}}>ver rotas</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Drawer2', {screen: 'Drawer2.1'})} style={{backgroundColor: "green"}}><Text style={{color: "white"}}>Navegar para 2.1</Text></Pressable>
      {/* <Text>Info: {info}</Text> */}
    </View>
  );
}
 
function Drawer1() {
  return (
    <Drawer.Navigator initialRouteName="Drawer2">
      <Drawer.Screen name="Drawer2" component={Drawer2} />
      <Drawer.Screen name="Drawer3" component={Drawer3} />
      <Drawer.Screen name="Drawer4" component={Drawer4} />
    </Drawer.Navigator>
  );
}

function Drawer2() {
  return (
    <Drawer.Navigator initialRouteName="Drawer2.1">
      <Drawer.Screen name="Drawer2.1" component={ViewText} />
      <Drawer.Screen name="Drawer2.2" component={ViewText} />
      <Drawer.Screen name="Drawer2.3" component={ViewText} />
    </Drawer.Navigator>
  );
}
function Drawer3() {
  return (
    <Drawer.Navigator initialRouteName="Drawer3.1">
      <Drawer.Screen name="Drawer3.1" component={ViewText} />
      <Drawer.Screen name="Drawer3.2" component={ViewText} />
      <Drawer.Screen name="Drawer3.3" component={ViewText} />
    </Drawer.Navigator>
  );
}
function Drawer4() {
  return (
    <Drawer.Navigator initialRouteName="Drawer4.1">
      <Drawer.Screen name="Drawer4.1" component={ViewText} />
      <Drawer.Screen name="Drawer4.2" component={ViewText} />
      <Drawer.Screen name="Drawer4.3" component={ViewText} />
    </Drawer.Navigator>
  );
}

export default function Teste() {
  return (
    // <InfoProvider>
      <Stack.Navigator initialRouteName="Drawer1">
        <Stack.Screen name="Drawer1" component={Drawer1} />
      </Stack.Navigator>
    // </InfoProvider>
  );
}