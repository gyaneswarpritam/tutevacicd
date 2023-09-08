import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import { Button } from 'react-native-paper';

const TextareaComponent = ({ lable, value, error, onChange, ...props }) => {
  return (
    <>
      <Row>
        <Col size={100}>
          <Text style={Styles.dropdownText2}>{lable}</Text>
          <View style={[Styles.boder, { marginTop: 30 }]}>
            <View style={{ padding: 15, paddingBottom: 0 }}>
              <TextInput
                defaultValue={value}
                multiline={true}
                placeholder={'Please type here'}
                placeholderTextColor={'#000000'}
                textAlignVertical={'top'}
                maxLength={500}
                style={OnboardingStyles.textArea}
                contextMenuHidden={false}
                onChange={event => onChange(event.nativeEvent.text)}
              />
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 13 }}>500 characters only</Text>
                <Button
                  onPress={() => { }}
                  uppercase={false}
                  style={{
                    paddingHorizontal: 0,
                    width: 50,
                    position: 'relative',
                    right: -6,
                  }}
                  labelStyle={{
                    color: '#FF7454',
                    fontSize: 10,
                    textAlign: 'right',
                    width: 50,
                  }}>
                  Clear
                </Button>
              </View>
            </View>
          </View>
        </Col>
      </Row>
      {error && <Text style={{ fontSize: 12, color: 'red' }}>{error}</Text>}
    </>
  );
};

const Styles = StyleSheet.create({
  boder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  dropdownText2: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 5,
  },
});
export default TextareaComponent;
