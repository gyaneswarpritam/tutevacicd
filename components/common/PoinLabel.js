import React from 'react';
import { Text, View } from 'react-native';

function PointLabel({ number, title }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>{number}</Text>
            </View>
            <Text style={{ marginLeft: 12, color: '#000000', fontWeight: '600', fontSize: 17 }}>{title}</Text>
        </View>
    )
}

export default PointLabel;