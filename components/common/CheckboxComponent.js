import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

const CheckboxComponent = ({
  label,
  value,
  error,
  setCheckboxDate,
  checkedValue,
  ...props
}) => {
  const [checked, setChecked] = useState(checkedValue);
  return (
    <>
      <Checkbox.Item
        color={'#707070'}
        uncheckedColor={'#707070'}
        style={Styles.checkBoxStyle}
        label={label}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setCheckboxDate(value, !checked);
          setChecked(!checked);
        }}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  checkBoxStyle: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
export default CheckboxComponent;
