import { View, Text, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useCallback } from 'react';
import { courseList } from '../../store/features/common/commonCourseSlice';
import { useDispatch } from 'react-redux';
import { Divider, Searchbar } from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';

const AutoSuggestionComponent = ({ courses, selectedSkills }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSuggestions = useCallback(async q => {
        setInput(q);
        if (q) {
            const filterToken = q.toLowerCase();
            setLoading(true);
            if (courses && courses?.length > 0) {
                const suggestions = courses
                    .filter(item => item.name.toLowerCase().includes(filterToken))
                    .map(item => ({
                        id: item._id,
                        title: item.name,
                    }));

                setSuggestionsList(suggestions);
            }
        } else {
            setSuggestionsList([]);
        }

        setLoading(false);
    }, [input]);

    const selectedCourseName = (name) => {
        dispatch(courseList({ name }))

        selectedSkills(name);
        setInput(name);
        setSuggestionsList([]);
        Keyboard.dismiss();

    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => selectedCourseName(item.title)}>
                <Text style={{ color: '#000000', padding: 15, textTransform: 'capitalize', zIndex: 99999 }} key={item.id} >
                    {item.title}
                </Text>
                <Divider />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView >
            <Searchbar placeholder='Search Courses' value={input}
                onChangeText={text => {
                    if (!text) selectedSkills(text);
                    getSuggestions(text)
                }}
                autoCorrect={false}
                autoFocus={true}
                underlineColorAndroid='transparent'
                onSubmitEditing={(event) => {
                    dispatch(courseList({ name: event.nativeEvent.text }))
                    selectedSkills(event.nativeEvent.text)
                    setSuggestionsList([]);
                }}
                style={{
                    position: 'absolute',
                    left: 48,
                    top: -60,
                    width: '82%',
                    zIndex: 9999999,
                }}
                inputStyle={[MainStyleSheet.fontSemiQuicksand, { fontSize: 18, paddingHorizontal: 1, color: '#222222' }]}
            />
            <FlatList data={suggestionsList}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ backgroundColor: '#FFFFFF', marginTop: 4 }}
            />
        </SafeAreaView>
    )
}

export default AutoSuggestionComponent;