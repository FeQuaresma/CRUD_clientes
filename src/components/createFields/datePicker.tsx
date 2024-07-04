import { useState } from "react";
import { View, TextInput, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../constants/styles";

export default function DatePicker({ field, onValueChange }: any) {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateValue, setDateValue] = useState(field);

  const toggleDatePicker = () => {
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
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}
      <Pressable onPress={toggleDatePicker}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={dateValue}
          onChangeText={(e) => {
            setDateValue(e);
          }}
          keyboardType="numeric"
          onPressIn={toggleDatePicker}
        />
      </Pressable>
    </View>
  );
}
