import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { Col, Row, Grid } from 'react-native-easy-grid';

const DropdownComponent = ({
  label,
  value,
  labelField = 'label',
  valueField = 'value',
  data,
  error,
  ...props
}) => {
  return (
    <>
      <Row>
        <Col size={100} style={{ marginTop: 20 }}>
          <Text style={multiSelectStyles.dropdownText}>{label}</Text>
          <Dropdown
            style={multiSelectStyles.dropdown2}
            placeholderStyle={multiSelectStyles.placeholderStyle}
            selectedTextStyle={multiSelectStyles.selectedTextStyle}
            inputSearchStyle={multiSelectStyles.inputSearchStyle}
            iconStyle={multiSelectStyles.iconStyle}
            data={data}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder="Select"
            searchPlaceholder="Search..."
            value={value}
            {...props}
          />
        </Col>
      </Row>
      {error && <Text style={{ fontSize: 12, color: 'red' }}>{error}</Text>}
    </>
  );
};

const multiSelectStyles = StyleSheet.create({
  dropdown: {
    height: 55,
    backgroundColor: 'transparent',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 25,
    paddingLeft: 14,
    paddingRight: 10,
  },
  dropdown2: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderColor: '#222222',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 14,
    paddingRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  selectedStyle: {
    borderRadius: 50,
    backgroundColor: '#FFD9CF',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
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
  dropdownText2: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 5,
  },
});
export default DropdownComponent;
