import { useState } from "react";
import { View, TextInput, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function DatePicker({ field, onValueChange, dateOrder }: any) {
  const [showPicker, setShowPicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateValue, setDateValue] = useState(field);

  const toggleDatePicker = () => {
    console.log(dateOrder);
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        const formatedDate = formatDate(currentDate);
        setDateValue(formatedDate);
        onValueChange(formatedDate);
      }
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate: any) => {
    console.log(rawDate);
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  function valueDetect() {
    if (dateOrder) {
      return field.valueMasked[dateOrder];
    }
    if (field.valueMasked) {
      return field.valueMasked 
    }
   return field.value
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          style={{ ...styles.input, ...field.customCSS }}
          maxLength={field.maxLength}
          value={field.valueMasked ? field.valueMasked : field.value}
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
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          locale="pt-BR"
        />
      )}
    </View>
  );
}
