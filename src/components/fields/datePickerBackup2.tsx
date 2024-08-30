

import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Platform,
  Text,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles, stylesModal } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function DatePicker({ field, onValueChange, dateOrder }: any) {
  const [showPicker, setShowPicker] = useState(false);

  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (Platform.OS === "ios" && showPicker) {
      onChangeIOS();
    }
  }, [date]);

  // useEffect(()=>console.log("true Value",field.value, "masked Value",field.valueMasked),[field])

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  function onChangeIOS() {
    const formatedDate = formatDate(date);
    onValueChange(formatedDate);
    toggleDatePicker();
  }

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      setDate(selectedDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        const formatedDate = formatDate(selectedDate);
        onValueChange(formatedDate);
      }
    } else {
      toggleDatePicker();
    }
  };

  function isAndroid() {
    if (Platform.OS === "android") {
      return true;
    } else {
      return false;
    }
  }

  const formatDate = (rawDate: any) => {
    let year = rawDate.getFullYear();
    let month: any = rawDate.getMonth() + 1;
    let day: any = rawDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}${month}${year}`;
  };

  function valueDetect() {
    if (dateOrder) {
      return field.valueMasked[dateOrder];
    }
    if (field.valueMasked) {
      return field.valueMasked;
    }
    return field.value;
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          style={{ ...styles.input, ...field.customInputCSS }}
          maxLength={field.maxLength}
          value={valueDetect()}
          onChangeText={async (e) => {
            onValueChange(e);
          }}
          keyboardType="numeric"
        />

        <Pressable
          style={{
            height: 30,
            width: 30,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={toggleDatePicker}
        >
          <Ionicons name="calendar" size={18} color="white" />
        </Pressable>
      </View>

      {!isAndroid() && (
        <Modal
          animationType="none"
          transparent={true}
          visible={showPicker}
          onRequestClose={() => {
            alert("Modal has been closed.");
            toggleDatePicker();
          }}
        >
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              <DateTimePicker
                mode="date"
                display="inline"
                value={date}
                onChange={(e, selectDate) => {
                  // setDate(selectDate ? selectDate : date);
                  console.log(e);
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {isAndroid() && showPicker && (
        <DateTimePicker
          mode="date"
          display="inline"
          value={date}
          onChange={onChange}
          onTouchEnd={() => {
            console.log("onTouchEnd");
          }}
        />
      )}
    </View>
  );
}
