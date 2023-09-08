import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import OnboardingStyles from '../styleSheet/OnboardingStyle';
import {
  Button,
  Appbar,
  Text,
} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';

const ProfileUpdateSuccessScreen = ({ navigation }) => {
  return (
    <>
      <View style={OnboardingStyles.container}>
        <Appbar.Header style={OnboardingStyles.navBar}>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.navigate('TutorSocial')}
          />
        </Appbar.Header>
        <View style={{ alignItems: 'center', marginTop: 150 }}>
          <Image
            source={require('../assets/images/check.png')}
            style={{ height: 150, width: 150 }}
          />
          <View style={{ marginTop: 50, paddingHorizontal: 40 }}>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#484646' }}>
              {
                'You have successfully completed\nregistration. Look out for a mail from us!'
              }
            </Text>
          </View>
        </View>
        <Grid style={OnboardingStyles.footerBtn}>
          <Col style={{ alignItems: 'center' }}>
            <Button
              onPress={() => navigation.navigate('TutorDashboard')}
              uppercase={false}
              labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
              style={[OnboardingStyles.nextBtn, { width: 150 }]}>
              OK
            </Button>
          </Col>
        </Grid>
      </View>
    </>
  );
};

export default ProfileUpdateSuccessScreen;
