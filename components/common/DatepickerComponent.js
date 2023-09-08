import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Col, Row } from 'react-native-easy-grid';
import Input from './Input';

const DatepickerComponent = ({
  label,
  mode,
  error,
  setInputDate,
  value,
  ...props
}) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])
  return (
    <>
      {mode === 'date' ? <DatePicker
        modal
        mode='date'
        open={open}
        date={new Date(value)}
        textColor={'#000000'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setInputDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> :
        <DatePicker
          modal
          mode='time'
          open={open}
          date={value}
          textColor={'#000000'}
          onConfirm={date => {
            setOpen(false);
            setTime(date);
            setInputDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      }
      <Row>
        <Col>
          {/* <Text style={Styles.dropdownText}>{label}</Text> */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setOpen(true)}>
            <Input
              label={label}
              editable={false}
              value={mode == 'date' ? date && date.toLocaleDateString() : formatAMPM(time)}
              date
            />
          </TouchableOpacity>
        </Col>
      </Row>
      {error && <Text style={{ fontSize: 12, color: 'red', marginTop: 2 }}>{error}</Text>}
    </>
  );
};

const formatAMPM = date => {
  if (date instanceof Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
};

const Styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    padding: 8,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    height: 55,
    justifyContent: 'center',
    color: '#000000',
  },
  dropdownText: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -8,
    left: 10,
    zIndex: 5,
  },
});
export default DatepickerComponent;
