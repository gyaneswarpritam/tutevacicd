import { View, Text } from 'react-native'
import React from 'react'

const AutoSuggestionInputComponent = () => {
    return (
        <TextInput placeholder='Search Courses' value={input}
            onChangeText={text => getSuggestions(text)}
            style={{
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
                width: '100%',
            }}
            focusable={true}
        />
    )
}

export default AutoSuggestionInputComponent