import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { Col, Row } from 'react-native-easy-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TitleHeader = ({ title, onPress, showViewAll = true }) => {
    return (
        <Row style={{ marginVertical: 10, marginLeft: 4 }}>
            <Col size={70}>
                <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading]}>
                    {title}
                </Text>
            </Col>
            <Col size={30}>
                {showViewAll ?
                    <TouchableOpacity
                        onPress={onPress}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[MainStyleSheet.viewAll, MainStyleSheet.fontSemiQuicksand]}>VIEW ALL{' '}</Text>
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={12}
                                color="#F9B406"
                            />
                        </View>
                    </TouchableOpacity> :
                    <></>}
            </Col>
        </Row>

    )
}

export default TitleHeader