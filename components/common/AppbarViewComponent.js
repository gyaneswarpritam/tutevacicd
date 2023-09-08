import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import MainStyleSheet from '../../styleSheet/MainStyleSheet'
import { useTheme } from '@react-navigation/native'
import { Back, Edit } from '../../assets/images'

const AppbarViewComponent = ({ title, icon, rightIcon, navigatePressed, rightNavigatePressed }) => {
    const { colors } = useTheme();
    return (
        <>
            <StatusBar animated={true} backgroundColor={colors.primary} />
            <Appbar.Header style={MainStyleSheet.navBar}>
                {icon ?
                    <TouchableOpacity onPress={navigatePressed}
                        style={styles.iconStyle}>
                        <Back width="30" height="30" />
                    </TouchableOpacity>
                    : <></>}
                <Appbar.Content
                    title={<Text style={styles.title}> {title} </Text>}
                    style={{ alignItems: 'center' }}
                />
                {rightIcon ?
                    <TouchableOpacity onPress={rightNavigatePressed}
                        style={styles.rightIconStyle}>
                        <Edit width="20" height="20" />
                    </TouchableOpacity>
                    : <></>}
            </Appbar.Header>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontFamily: 'Lato Bold',
        fontSize: 25,
    },
    iconStyle: {
        position: 'absolute',
        left: 15,
        top: 14,
        zIndex: 99999
    },
    rightIconStyle: {
        position: 'absolute',
        right: 15,
        top: 20,
        zIndex: 99999,
    }
})
export default AppbarViewComponent;