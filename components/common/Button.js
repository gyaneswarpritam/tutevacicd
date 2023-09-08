import React from 'react';
import { Button, Text } from 'react-native-paper';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';

const CustomButton = ({ title, onPress, enrollBtn = false, icon, bgColor = '#F9B406', btnTextColor = "#FFFFFF" }) => {
  return (
    <Button
      mode="contained"
      // icon={icon}
      icon={({ size, color }) => (
        <Text style={{ marginRight: '-3%' }}>
          {icon}
        </Text>
      )}
      onPress={onPress}
      uppercase={false}
      labelStyle={[styles.btnLable, MainStyleSheet.fontBoldQuicksand, { color: btnTextColor }]}
      style={[enrollBtn ? OnboardingStyles.submitCustomBtn : OnboardingStyles.submitBtn, { backgroundColor: bgColor }]}
      contentStyle={{ flexDirection: 'row-reverse' }}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnLable: {
    fontSize: 18,
    paddingLeft: 16
  }
})
export default CustomButton;
