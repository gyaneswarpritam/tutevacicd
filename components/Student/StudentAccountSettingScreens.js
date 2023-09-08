import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { Appbar, Button, Divider, List } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import ListWithIcons from '../common/ListWithIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/auth/authSlice';
import AppbarViewComponent from '../common/AppbarViewComponent';
import CustomButton from '../common/Button';
import { useTheme } from '@react-navigation/native';
import SubmitButton from '../common/SubmitButton';
import { ButtonArrow } from '../../assets/images';

const StudentAccountSettingScreens = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppbarViewComponent title="My Account" icon={"arrow-left-thin-circle-outline"}
        navigatePressed={() => navigation.goBack()} />
      <ScrollView
        style={[MainStyleSheet.scrollView]}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ marginBottom: 100 }}>
          <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin, { marginBottom: 10 }]}>
            Hey! John Smith
          </Text>
          <Grid style={{ marginBottom: 20 }}>
            <Row style={{ marginBottom: 10 }}>
              <Col size={50} style={{ marginRight: 10 }}>
                <CustomButton title="My Classes" onPress={() => console.log('Pressed')} buttonWidth={198}
                  bgColor={'#222222'} btnTextColor={colors.primary}
                />
              </Col>
              <Col size={50}>
                <CustomButton title="Invoices" onPress={() => console.log('Pressed')} buttonWidth={198}
                  bgColor={'#222222'} btnTextColor={colors.primary}
                />
              </Col>
            </Row>
            <Row>
              <Col size={50} style={{ marginRight: 10 }}>
                <CustomButton title="Up Next" onPress={() => console.log('Pressed')} buttonWidth={198}
                  bgColor={'#222222'} btnTextColor={colors.primary}
                />
              </Col>
              <Col size={50}>
                <CustomButton title="Help Desk" onPress={() => console.log('Pressed')} buttonWidth={198}
                  bgColor={'#222222'} btnTextColor={colors.primary}
                />
              </Col>
            </Row>
          </Grid>

          <Divider />
          <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin, { marginBottom: 10 }]}>
            Account Settings
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('StudentEditProfile')}>
            <ListWithIcons
              title="Edit Profile"
              leftIcon={'account-edit-outline'}
              rightIcon={'arrow-right-circle-outline'}
            />
          </TouchableOpacity>
          <ListWithIcons
            title="Update Password"
            leftIcon={'account-lock-outline'}
            rightIcon={'arrow-right-circle-outline'}
          />
          <Divider />
          <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin, { marginBottom: 10 }]}>
            Information
          </Text>
          <ListWithIcons
            title="Terms & Policies"
            leftIcon={'file-document-multiple-outline'}
            rightIcon={'arrow-right-circle-outline'}
          />
          <ListWithIcons
            title="FAQs"
            leftIcon={'comment-question-outline'}
            rightIcon={'arrow-right-circle-outline'}
          />
          <Divider />
          {/* <Button
            icon="logout"
            mode="outlined"
            style={{ margin: 10 }}
            theme={{ colors: { primary: '#F9B406' } }}
            onPress={() => dispatch(logout())}>
            Logout
          </Button> */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <SubmitButton title="Logout" onPress={() => dispatch(logout())} buttonWidth={198}
              icon={<ButtonArrow />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AccountSettingStyle = StyleSheet.create({
  headerTitle: { paddingBottom: 10, paddingTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default StudentAccountSettingScreens;
