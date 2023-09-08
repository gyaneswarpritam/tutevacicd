import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';

const Input = ({
  label,
  value,
  error,
  password,
  date,
  editable,
  keyboardType,
  maxLength,
  // onFocus = () => {},
  ...props
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <>
      <TextInput
        theme={{ roundness: 4, colors: { primary: '#222222', underlineColor: 'transparent', } }}
        label={label}
        mode={'outlined'}
        outlineColor={'#222222'}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        value={value}
        editable={editable}
        maxLength={maxLength}
        right={
          password ? (
            <TextInput.Icon
              name={hidePassword ? 'eye' : 'eye-off'}
              onPress={() => setHidePassword(!hidePassword)}
              style={styles.icon}
            />
          ) : date ? (
            <TextInput.Icon name={'calendar'} style={styles.icon} />
          ) : (
            ''
          )
        }
        style={[OnboardingStyles.textInput, MainStyleSheet.fontSemiQuicksand]}
        {...props}
      // onFocus={() => {
      //   onFocus();
      //   setIsFocused(true);
      // }}
      // onBlur={() => {
      //   setIsFocused(false);
      // }}
      />
      {error && <Text style={{ fontSize: 12, color: 'red' }}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
  },
});
export default Input;
