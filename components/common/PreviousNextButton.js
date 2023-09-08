import React from 'react';
import { Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { ButtonArrow, GreyArrow } from '../../assets/images';

const PreviousNextButton = ({ prevTitle, nextTitle, nextNavigate, onPressNext, onPressPrev, buttonWidth = 208, icon, bgColor = '#F9B406', btnTextColor = "#FFFFFF" }) => {
  return (
    <Grid style={{ marginVertical: 20 }}>
      <Row>
        <Col style={{ paddingHorizontal: 5 }}>
          <Button
            mode="contained"
            // icon={icon}
            icon={({ size, color }) => (
              <Text style={{ marginLeft: '-6%' }}>
                <GreyArrow />
              </Text>
            )}
            onPress={onPressPrev}
            uppercase={false}
            labelStyle={[styles.btnPrevLable, MainStyleSheet.fontBoldQuicksand, { color: btnTextColor }]}
            style={[styles.submitBtn, { backgroundColor: bgColor }]}
            contentStyle={{ flexDirection: 'row' }}>
            {prevTitle}
          </Button>
        </Col>
        <Col style={{ paddingHorizontal: 5 }}>
          <Button
            mode="contained"
            // icon={icon}
            icon={({ size, color }) => (
              <Text >
                <ButtonArrow />
              </Text>
            )}
            onPress={onPressNext}
            uppercase={false}
            labelStyle={[styles.btnNextLable, MainStyleSheet.fontBoldQuicksand, { color: btnTextColor }]}
            style={[styles.submitBtn, { backgroundColor: bgColor }]}
            contentStyle={{ flexDirection: 'row-reverse' }}
          >
            {nextTitle}
          </Button>
        </Col>
      </Row>
    </Grid >

  );
};

const styles = StyleSheet.create({
  btnNextLable: {
    fontSize: 16,
    paddingLeft: 40
  },
  btnPrevLable: {
    fontSize: 16,
    paddingRight: 15,
  },
  submitBtn: {
    borderRadius: 50,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
})
export default PreviousNextButton;
