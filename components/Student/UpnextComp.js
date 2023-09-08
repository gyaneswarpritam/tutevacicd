import * as React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {
  Title,
  Subheading,
  Paragraph,
  Divider,
  List,
  Button,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);

const UpnextComp = ({classData, navigation}) => {
  return (
    <Grid>
      <Row>
        <Col size={30} style={{padding: 8}}>
          {classData && classData.media ? (
            <Image
              style={{width: 120, height: 120, borderRadius: 4}}
              source={{uri: classData.media}}
              unoptimized={true}
            />
          ) : (
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 4,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/noimage.jpg')}
            />
          )}
          <View style={SearchCompStyle.subTitle}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {classData?.name}
            </Text>
          </View>
          <Subheading style={SearchCompStyle.pTitle}>
            <Ionicons name="calendar" size={12} />
            <Text>
              {classData && classData?.startDate
                ? dayjs.utc(classData?.startDate).local().format('ll')
                : classData.startDate}{' '}
              {dayjs.utc(classData?.startTime).local().format('hh:mm A')}
            </Text>
          </Subheading>
        </Col>
      </Row>
    </Grid>
  );
};
const SearchCompStyle = StyleSheet.create({
  mainTitle: {
    color: '#000000',
    fontSize: 16,
    bottom: 9,
    // fontWeight: 100,
  },
  subTitle: {
    color: '#000000',
    fontSize: 12,
    letterSpacing: 1,
    width: 120,
    paddingTop: 4,
    paddingBottom: 4,
  },
  pTitle: {
    color: '#999999',
    fontSize: 8,
    width: 120,
    top: -10,
    color: '#524f50',
    paddingBottom: 3,
  },
  paragraph: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 10,
  },
  enrollBtn: {
    backgroundColor: '#FF7454',
    fontSize: 12,
    borderRadius: 4,
  },
  img: {
    height: 79,
    width: 119,
    resizeMode: 'contain',
  },
});

export default UpnextComp;
