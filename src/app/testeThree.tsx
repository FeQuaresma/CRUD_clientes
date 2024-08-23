import { useEffect, useState } from "react";

import CalendarPicker from "react-native-calendar-picker";

import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

export default function TesteCalendar() {
  const [selected, setSelected] = useState("");


  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View style={{ backgroundColor: "white" }}>
        <CalendarPicker
          onDateChange={(e) => {
            console.log(e);
          }}
        />
      </View>
    </View>
  );
}
