import { FlatList, Image, StyleSheet, Text, View, useWindowDimensions, Animated } from 'react-native'
import React, { Component } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { Button, FAB } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaginatorOnboarding from './PaginatorOnboarding';
import { ButtonArrow, Launch_screen, Slider1, Slider2, Slider3, Slider4 } from '../../assets/images';
import SubmitButton from './SubmitButton';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';

const OnboardingComponent = ({ setShowOnboard }) => {
    const { colors } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { width } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const data = [
        {
            id: 1,
            title: 'Grow Your Education With Tuteva',
            description: 'Grow Your Education With Tuteva',
        },
        {
            id: 2,
            title: 'A Place To Quench Your Thirst For Knowledge',
            description: 'A Place To Quench Your Thirst For Knowledge',
        },
        {
            id: 3,
            title: 'Connect With Top Tutors Around The World',
            description: 'A Place To Quench Your Thirst For Knowledge',
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={[styles.container, { width }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Launch_screen />
                        {/* <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]} /> */}
                        {item.id == 1 ? <Slider1 width="300" /> : <></>}
                        {item.id == 2 ? <Slider2 width="300" /> : <></>}
                        {item.id == 3 ? <Slider4 width="300" /> : <></>}
                        <Text style={[styles.title, MainStyleSheet.fontBoldLato]}>{item.title}</Text>
                        {currentIndex == 2 ?
                            <View style={{ marginTop: 20 }}>
                                <SubmitButton title="Get Started"
                                    icon={<ButtonArrow />}
                                    onPress={() => {
                                        AsyncStorage.setItem('onboard', 'true')
                                        setShowOnboard();
                                    }} />
                            </View> : <></>}
                    </View>
                </View>

            </>
        )
    }

    // const viewConfig = useRef({ viewAreaCoveragePersentThreshold: 50 }).current;
    const onViewableItemsChanged = ({
        viewableItems,
    }) => {
        // Do stuff
        setCurrentIndex(viewableItems[0].index);
    };
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);
    return (
        <View style={[styles.container]}>
            <FlatList
                data={data}
                renderItem={(item) => renderItem(item)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                viewabilityConfigCallbackPairs={
                    viewabilityConfigCallbackPairs.current
                }
            />
            <PaginatorOnboarding data={data} scrollX={scrollX} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 0.8,
        justifyContent: 'center',
        width: 300
    },
    title: {
        fontSize: 33,
        color: '#F9B406',
        width: 280,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
    },
    fab: {
        position: 'absolute',
        bottom: 50,
        left: 'auto',
        right: 'auto'
    },
})
export default OnboardingComponent;