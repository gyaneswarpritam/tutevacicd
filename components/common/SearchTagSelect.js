import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Button, Card} from 'react-native-paper';
let _h = 40;
const SearchTagSelect = ({filterKeys, selectedSkills}) => {
  let fakeData = ['User Research', 'User Testing', 'User Interface'];
  const [searchData, setSearchData] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [noMatch, setNoMatch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setNoMatch('');
    setSearchData([]);
  }, []);

  useEffect(() => {
    setSearchData([]);
    setSearchTxt('');
    setNoMatch('');
    selectedSkills(selectedTags);
  }, [selectedTags]);

  const addTags = tags => {
    let newTags = [...selectedTags];
    newTags.push(tags);
    setSelectedTags(newTags);
  };

  const removeTags = i => {
    let newTags = [...selectedTags];
    newTags.splice(i, 1);
    setSelectedTags(newTags);
  };

  const removeAll = () => {
    setSearchData([]);
    setSearchTxt('');
    setSelectedTags([]);
    setNoMatch('');
  };

  const search = async searchText => {
    let data = [...fakeData];
    let newData = [];
    setSearchTxt(searchText);
    if (searchText != '' && filterKeys && filterKeys?.length > 0) {
      newData = filterKeys.filter(function (item) {
        let s_item = item?.name?.toLowerCase();
        return s_item.indexOf(searchText.toLowerCase()) > -1;
      });
    }
    if (searchText != '' && newData?.length == 0) {
      setNoMatch(searchText);
    } else {
      setNoMatch('');
    }
    setSearchData(newData);
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 2,
          paddingBottom: selectedTags?.length > 0 ? 15 : null,
        }}>
        <TextInput
          onChangeText={e => search(e)}
          placeholderTextColor={'#ccc'}
          placeholder={'Start typing a skill and choose from the dropdown'}
          value={searchTxt}
          style={{
            height: _h,
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingHorizontal: 8,
            fontSize: 11,
            color: '#111',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
          }}>
          {searchData &&
            selectedTags?.length > 0 &&
            selectedTags.map((ele, i) => (
              <View
                key={ele?._id}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#FFC0B1',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 12,
                  paddingRight: 3,
                  borderRadius: 20,
                  marginLeft: 4,
                  marginTop: 6,
                  zIndex: 999999,
                }}>
                <Text style={{fontSize: 12, color: '#000000'}}>
                  {ele?.name}
                </Text>
                <TouchableOpacity
                  onPress={() => removeTags(ele?.id)}
                  style={{padding: 6}}>
                  <Text style={{fontSize: 11, color: '#000000'}}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
      {/* {selectedTags.length > 0 && (
        <TouchableOpacity
          onPress={() => removeAll()}
          style={{padding: 6, alignSelf: 'flex-end', paddingRight: 0}}>
          <Text style={{fontSize: 12, color: '#FF7454'}}>Clear</Text>
        </TouchableOpacity>
      )} */}
      {((searchData && searchData?.length > 0) || noMatch != '') && (
        <Card
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            top: _h,
            zIndex: 9999999999,
            width: '100%',
            borderColor: '#E0E0E0',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}>
          {searchData &&
            searchData?.length > 0 &&
            searchData.map((ele, i) => (
              <Button
                disabled={selectedTags.includes(ele?.name)}
                onPress={() => addTags(ele)}
                uppercase={false}
                mode={'outlined'}
                labelStyle={{fontSize: 11, color: '#707070'}}
                style={{
                  paddingVertical: 0,
                  alignItems: 'flex-start',
                  borderWidth: 0,
                }}
                key={ele?._id}>
                <Text>{ele?.name}</Text>
              </Button>
            ))}
          {/* {noMatch != '' && (
            <Button
              onPress={() => addTags(noMatch)}
              uppercase={false}
              mode={'outlined'}
              labelStyle={{fontSize: 11, color: '#707070'}}
              style={{
                paddingVertical: 0,
                alignItems: 'flex-start',
                borderWidth: 0,
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
              }}>
              <Text>Add new skill</Text>{' '}
              <Text style={{fontWeight: 'bold', fontSize: 11}}>{noMatch}</Text>
            </Button>
          )} */}
        </Card>
      )}
    </View>
  );
};

export default SearchTagSelect;
