import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import { Kidspin, Parent, Parentpin, Student } from '../../assets/images';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ParentAutoLockScreen from './ParentAutoLockScreen';

const ParentPopupScreen = ({ modalVisible = false, closeModal }) => {
    const [modalVisiblePin, setModalVisiblePin] = useState(false);
    const kids = [
        {
            name: 'Kid 1',
        }
    ]

    const dynamicMargin = kids.length == 1
        ? styles.marginKids
        : '';
    return (
        <>
            <ParentAutoLockScreen modalVisiblePin={modalVisiblePin} closeModal={() => setModalVisiblePin(false)} />
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.innerModal}>
                            <View style={dynamicMargin}>
                                <TouchableOpacity onPress={() => {
                                    closeModal();
                                    setModalVisiblePin(true)
                                }}>
                                    <Parentpin />
                                    <Text style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center', marginVertical: 6 }}>Parent</Text>
                                </TouchableOpacity>
                            </View>
                            {kids.map((res) => {
                                return (
                                    <View key={res.name}>
                                        <Kidspin />
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center', marginVertical: 6 }}>{res.name}</Text>
                                    </View>)
                            })}
                        </View>



                    </View>
                </Modal>
            </View>
        </>

    );
}

export default ParentPopupScreen;


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
    marginKids: {
        marginRight: 30
    }
});