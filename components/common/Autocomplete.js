import { View, Text, Dimensions } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useDispatch } from 'react-redux';
import { courseList } from '../../store/features/studentCourse/studentCourseSlice';

const Autocomplete = ({ filteredDropdownData, selectedSkills, courses }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase();
    // if (typeof q !== 'string' || q.length < 3) {
    //   setSuggestionsList(null);
    //   return;
    // }
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

    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
    selectedSkills('');
    dispatch(courseList({ name: '' }))
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => { }, []);
  return (
    <View>
      <AutocompleteDropdown
        ref={searchRef}
        controller={controller => {
          dropdownController.current = controller;
        }}
        // initialValue={'1'}
        direction={Platform.select({ ios: 'down' })}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={item => {
          if (item && item?.title) {
            setSelectedItem(item?.title);
            selectedSkills(item?.title);
            dispatch(courseList({ name: item?.title }))
          }

        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        onClear={onClearPress}
        onSubmit={e => {
          selectedSkills(e.nativeEvent.text);
          dispatch(courseList({ name: e.nativeEvent.text }))
          setSuggestionsList(null);
        }}
        onOpenSuggestionsList={onOpenSuggestionsList}
        loading={loading}
        useFilter={false} // set false to prevent rerender twice
        textInputProps={{
          placeholder: 'Search Class here...',
          autoCorrect: false,
          autoCapitalize: 'none',
          color: '#fff',
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,

          alignSelf: 'center',
        }}
        inputContainerStyle={{
          // backgroundColor: '#383b42',
          // borderRadius: 25,
          backgroundColor: '#302C54',
          color: '#ffffff',
          elevation: 0,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: '#302C54',
          color: '#fff',
        }}
        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
        renderItem={item => (
          <Text style={{ color: '#fff', padding: 15 }} key={item.id}>
            {item.title}
          </Text>
        )}
        inputHeight={50}
        showChevron={false}
        closeOnBlur={false}
        showClear={true}
      />
    </View>
  );
};

export default Autocomplete;
