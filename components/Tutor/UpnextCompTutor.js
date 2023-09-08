import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { tutorCourseDetails } from '../../store/features/tutorCourse/tutorCourseSlice';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);

const UpnextcomTutor = ({ slideVal }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateDetailsPage = ele => {
    dispatch(tutorCourseDetails(ele?.course));
    navigation.navigate('ClassDetails', { data: ele });
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigateDetailsPage(slideVal)}>
      <View style={MainStyleSheet.slide}>
        <Grid>
          <Col size={32}>
            {slideVal && slideVal.media ? (
              <Image
                source={{ uri: slideVal.media }}
                style={{ height: 79, width: 119, borderRadius: 4 }}
              />
            ) : (
              <Image
                style={{ height: 79, width: 119, borderRadius: 4, resizeMode: 'contain' }}
                source={require('../../assets/images/noimage.jpg')}
              />
            )}
          </Col>
          <Col size={50} style={{ paddingLeft: 20 }}>
            <Title style={UpNextStyle.mainTitle}>{slideVal?.courseName}</Title>
            {/* <View style={[UpNextStyle.subTitle, { marginTop: 0 }]}>
              <Image
                style={{ height: 20, width: 16 }}
                source={require('./../../assets/images/location.png')}
              />
              <Text style={{ marginLeft: 8, fontSize: 12 }}>
                {slideVal.address}
              </Text>
            </View> */}
            <View style={UpNextStyle?.subTitle}>
              <Image
                style={{ height: 17, width: 17 }}
                source={require('./../../assets/images/calendar.png')}
              />
              <Text style={{ marginLeft: 8, fontSize: 12 }}>
                {slideVal?.notifyDate
                  ? dayjs.utc(slideVal?.notifyDate).local().format('ll')
                  : slideVal?.notifyDate}{' '}
                {dayjs.utc(slideVal?.startTime).local().format('hh:mm A')}
              </Text>
            </View>
          </Col>
        </Grid>
      </View>
    </TouchableWithoutFeedback>
  );
};
const UpNextStyle = StyleSheet.create({
  mainTitle: {
    color: '#000000',
    fontSize: 16,
    position: 'relative',
    top: -6,
  },
  subTitle: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  pTitle: {
    color: '#999999',
    fontSize: 12,
    top: -16,
    letterSpacing: 0,
  },
});

export default UpnextcomTutor;
