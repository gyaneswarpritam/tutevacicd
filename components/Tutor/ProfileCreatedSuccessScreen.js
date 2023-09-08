import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import {
  Card,
  Button,
  Appbar,
  RadioButton,
  Checkbox,
  Text,
  TextInput,
} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import AppbarViewComponent from '../common/AppbarViewComponent';

const ProfileCreatedSuccessScreen = ({ navigation, route }) => {
  const messaage = route?.params?.message;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppbarViewComponent title="Success" />
        <ScrollView
          style={[MainStyleSheet.scrollView]}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={Styles.scroll_view}>
            <View style={{ alignItems: 'center', marginTop: 150 }}>
              <Image
                source={require('../../assets/images/check.png')}
                style={{ height: 150, width: 150 }}
              />
              <View style={[MainStyleSheet.fontBoldQuicksand, { marginTop: 50, fontSize: 14 }]}>
                <Text
                  style={{ fontSize: 15, textAlign: 'center', color: '#222222' }}>
                  {
                    `You have successfully ${messaage} your\nprofile.`
                  }
                </Text>
              </View>
              <Button
                onPress={() => navigation.navigate('Dashboard')}
                uppercase={false}
                labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
                style={[OnboardingStyles.nextBtn, { width: 150 }]}>
                OK
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const Styles = StyleSheet.create({
  scroll_view: {
    flex: 1
  },
});

export default ProfileCreatedSuccessScreen;
