import React, { useRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'


export const OTPInput = ({
    disabled,
    value,
    onChange
}) => {
    const inputRefs = useRef([])

    const onChangeValue = (text, index) => {
        value[index] = text && parseInt(text) || 0;
    }

    const handleChange = (text, index) => {
        onChangeValue(text, index)
        if (index == 3) {
            onChange(value)
        }
        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus()
        }

        return inputRefs?.current[index - 1]?.focus()
    }

    const handleBackspace = (event, index) => {
        const { nativeEvent } = event

        if (nativeEvent.key === 'Backspace') {
            handleChange('', index)
        }
    }

    return (
        <View style={styles.container}>
            {value.map((item, index) => (
                <TextInput
                    ref={ref => {
                        if (ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref]
                        }
                    }}
                    value={item}
                    key={index}
                    maxLength={1}
                    contextMenuHidden
                    selectTextOnFocus
                    editable={!disabled}
                    style={styles.input}
                    keyboardType="numeric"
                    testID={`OTPInput-${index}`}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={event => handleBackspace(event, index)}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        marginVertical: 10,
        fontSize: 20,
        color: '#222222',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        width: 65,
        height: 50,
        borderRadius: 8,
        borderWidth: 1
    }
})