



import React, { useState } from 'react';
import { Button, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import StyleCalendar from '../../style/StyleAll';

const Calendar = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dates, setDates]= useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    const jsonData = JSON.parse(date);
    const timestamp = jsonData.nativeEvent.timestamp;
    let x = new Date(timestamp)
    console.log(x.toISOString())
    let a= x.toISOString().slice(0,10);
    console.log(a);
    setDates(a);
    console.info(dates);
    hideDatePicker();
  };

  return (
    <View style={StyleCalendar.btn1}>
      <Button style={StyleCalendar.btn1} color={'#7bae5e'}  title="Thời gian đi" onPress={showDatePicker} />
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
          onChange={handleConfirm}
        />
      )}
    </View>
  );
};

export default Calendar;