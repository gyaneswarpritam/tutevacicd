import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import { Kidspin, Parent, Parentpin, Student } from '../../assets/images';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { OTPInput } from '../common/OTPInput';

const ParentAutoLockScreen = ({ modalVisiblePin = false, closeModal }) => {
    const [pinValue, setPinValue] = useState([0, 0, 0, 0]);
    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisiblePin}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.innerModal}>
                        <View >
                            <Parentpin />
                            <Text style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center', marginVertical: 6 }}>Parent</Text>
                        </View>
                        <View style={{ width: "80%" }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFFFFF' }}>Please enter the Profile PIN</Text>
                            <OTPInput
                                length={4}
                                disabled={false}
                                value={pinValue}
                            />
                        </View>
                    </View>



                </View>
            </Modal>
        </View>
    );
}

export default ParentAutoLockScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Light gray transparent overlay
        justifyContent: 'center',
        verticalAlign: 'middle',
        alignItems: 'center',
    },
    innerModal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Add elevation (shadow) to the modal content
    },
});