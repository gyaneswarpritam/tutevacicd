import * as React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import {
  Title,
  Subheading,
  Divider,
} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useState } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);
import { DateIcon } from '../../assets/images';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import CustomButton from '../common/Button';
import { useTheme } from '@react-navigation/native';

const CommonSearchComp = ({ classData, dividerShow, enrollBtn = false }) => {
  const { colors } = useTheme();
  return (
    <Grid>
      <Row style={{ paddingHorizontal: 4, paddingVertical: 0 }}>
        <Col size={30}>
          {classData && classData.media ? <Image
            style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'contain' }}
            source={{ uri: classData.media }}
            unoptimized={true}
          /> :
            <Image
              style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'contain' }}
              source={require('../../assets/images/noimage.jpg')}
            />}
        </Col>
        <Col size={78} style={{ paddingLeft: 25 }}>
          <Title style={[styles.mainTitle, MainStyleSheet.fontSemiQuicksand]} numberOfLines={1} >
            {classData?.name}
          </Title>
          <Grid>
            <Row style={{ marginTop: 4 }}>
              <Col size={12} >
                <DateIcon width="18" height="18" /></Col>
              <Col size={88}>
                <Text style={[styles.pTitle, MainStyleSheet.fontSemiQuicksand]}>
                  {classData && classData?.startDate
                    ? dayjs.utc(classData?.startDate).local().format('ll')
                    : classData.startDate}{' | '}
                  {dayjs.utc(classData?.startTime).local().format('hh:mm A')}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginTop: -20 }}>
              <Col>
                {enrollBtn &&
                  <CustomButton title="ENROLL NOW" onPress={() => console.log('Pressed')}
                    bgColor={'#222222'} btnTextColor={colors.primary} enrollBtn={enrollBtn}
                  />
                }
              </Col>
            </Row>
          </Grid>
        </Col>
      </Row>
      {dividerShow ? <Divider /> : <></>}

    </Grid>
  );
};
const styles = StyleSheet.create({
  mainTitle: {
    color: '#222222',
    textTransform: 'capitalize',
    fontSize: 18,
    lineHeight: 22
  },
  pTitle: {
    color: '#7E7E7E',
    fontSize: 12,
  },
});

export default CommonSearchComp;
