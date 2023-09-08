import React from 'react'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

const FabCreate = ({ onPress }) => {
    return (
        <FAB
            icon="plus"
            style={styles.fab}
            color='#FFFFFF'
            size="large"
            mode="elevated"
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#F9B406',
        color: '#FFFFFF'
    },
})
export default FabCreate