import React from 'react';
import { Text, View } from 'react-native';

function CompleteBar({ percentage, title }) {
    if (percentage != undefined) {
        return (
            <View style={{ justifyContent: 'center', width: '93%', alignSelf: 'center', marginTop: 17 }}>
                <Text style={{ color: '#000000' }}>{title}</Text>
                <View style={{ justifyContent: 'center', height: 15, width: '100%', alignSelf: 'center', marginTop: 5 }}>
                    <View style={{ height: 15, width: '100%', backgroundColor: '#FFFFFF', alignSelf: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }} />
                    <View style={{ backgroundColor: '#00BC6C', height: 15, width: percentage, borderRadius: 8, borderColor: '#00BC6C', position: 'absolute', top: 0, bottom: 5 }} />
                </View>
            </View>
        )
    } else {
        return null;
    }
}

export default CompleteBar;