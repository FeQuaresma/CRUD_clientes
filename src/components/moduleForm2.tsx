import { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Date,
  Select,
  File,
  Input,
  MultiSelect,
  Boolean,
  TextBox,
  Grid,
  Table,
  Image,
  Button,
  Text as TextPortal8,
  // Video,
  Sound,
} from "./fields";
import { styles } from "../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sumClass } from "../functions/sumClass";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function ModuleForm({
  pageSettings,
  formParam,
  formMode,
  navigation,
  route,
  callFather,
  callFatherTable,
  callFatherButton,
  setToken,
  setFormParam,
  formName,
  classes,
  consoleRN,
  openLog,
}: any) {
  const [tabSet, setTabSet] = useState<Set<string>>(new Set());

  function adicionarElemento(elemento: string) {
    setTabSet((prevSet) => new Set(prevSet).add(elemento));
  }

  useEffect(() => {
    Object.keys(formParam).forEach((componentName) => {
      adicionarElemento(formParam[componentName].group.name);
      console.log(componentName, formParam[componentName].group);
    });
  }, []);

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}
    >
      <Pressable onPress={() => console.log(tabSet)}>
        <Text>Teste</Text>
      </Pressable>
      <View>
        <Tab.Navigator>
          {Object.keys(tabSet).forEach((pageSet) => (
            <Tab.Screen name={pageSet}>
              {(e) => <Text>{pageSet}</Text>}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </View>
    </View>
  );
}
