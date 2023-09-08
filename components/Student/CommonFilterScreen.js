import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Button,
  Appbar,
  RadioButton,
  Checkbox,
  Text,
} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Dropdown } from 'react-native-element-dropdown';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { selectDays } from '../../constants/Constant';
import CheckboxComponent from '../common/CheckboxComponent';
import Slider from '@react-native-community/slider';
import { useDispatch } from 'react-redux';
import { courseList } from '../../store/features/studentCourse/studentCourseSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommonFilterScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const dispatch = useDispatch();
  const [classType, setClassType] = useState('');
  const [daysData, setDaysData] = useState(selectDays);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [distance, setDistance] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(20);
  const [inputs, setInputs] = useState({
    timings: [],
  });
  const [filterData, setFilterData] = useState({});

  const getFilterData = useCallback(async () => {
    let filters = await AsyncStorage.getItem("filters");
    setFilterData(JSON.parse(filters));
  }, [])
  useEffect(() => {
    getFilterData();

  }, [])
  useEffect(() => {
    if (filterData && Object.keys(filterData).length > 0) {
      setClassType(filterData?.type ? filterData?.type : '');
      setPrice(filterData?.priceTo ? filterData?.priceTo : 0)
      setDistance(filterData?.distance ? filterData?.distance : 0)
      filterData && filterData?.day?.length > 0 && filterData?.day.map(res => {
        selectDays.map(resp => {
          resp.value == res ? resp.checked = true : resp.checked = false
        })
      });
      setDaysData(selectDays)
    }
  }, [filterData])

  const searchFilter = async () => {
    let searchParam = {};
    if (name) {
      searchParam.name = name;
    }
    if (classType != '') {
      searchParam.type = classType;
    }
    if (price > 0) {
      searchParam.priceFrom = 0;
      searchParam.priceTo = price;
    }
    if (distance > 0) {
      searchParam.distance = distance;
    }
    if (inputs.timings.length > 0) {
      searchParam.day = inputs.timings;
    }
    await AsyncStorage.setItem("filters", JSON.stringify(searchParam));
    dispatch(courseList(searchParam));
    navigation.navigate('Search');
  };

  const setCheckboxDate = (value, checked) => {
    if (checked) {
      inputs.timings.push(value);
    } else {
      const index = inputs.timings.indexOf(value);
      if (index > -1) {
        inputs.timings.splice(index, 1);
      }
    }
  };

  const clearFilter = async () => {
    await AsyncStorage.removeItem('filters', () => {
      dispatch(courseList());
      navigation.navigate('Search')
    })
  }
  return (
    <>
      <View>
        <Appbar.Header style={MainStyleSheet.navBar}>
          <Appbar.Action
            icon="close"
            onPress={() => navigation.navigate('Home')}
          />
          <Appbar.Content title="Filter" />
        </Appbar.Header>
        <ScrollView style={[MainStyleSheet.scrollView]}>
          <Card style={[MainStyleSheet.card, searchStyles.cardPadding]}>
            <Grid>
              <Row>
                <Col size={100}>
                  <Text style={searchStyles.dropdownText2}>Type of Class</Text>
                  <View style={[searchStyles.boder, { marginTop: 30 }]}>
                    <RadioButton.Group
                      onValueChange={value => setClassType(value)}
                      value={classType ? classType : (filterData && filterData?.type ? filterData?.type : '')}>
                      <RadioButton.Item
                        color="#999999"
                        labelStyle="#999999"
                        label="In Person"
                        value="inperson"
                      />
                      <RadioButton.Item
                        color="#999999"
                        labelStyle="#999999"
                        label="Online"
                        value="online"
                      />
                    </RadioButton.Group>
                  </View>
                </Col>
              </Row>
              {/* <Row>
                <Col size={100}>
                  <Text style={searchStyles.dropdownText2}>Preferred days</Text>
                  <View style={[searchStyles.boder, {marginTop: 30}]}>
                    <Checkbox.Item label="Weekend" status="checked" />
                    <Checkbox.Item label="Weekdays" status="unchecked" />
                    <Checkbox.Item label="Morning" status="unchecked" />
                    <Checkbox.Item label="Afternoon" status="unchecked" />
                    <Checkbox.Item label="Evening" status="unchecked" />
                  </View>
                </Col>
              </Row> */}
              <View style={searchStyles.container}>
                {/* <Text>{JSON.stringify(inputs)}</Text> */}
                <Text style={searchStyles.dropdownText}>Preferred days</Text>
                {daysData &&
                  daysData.map(item => {
                    return (
                      <View style={searchStyles.item} key={item.value}>
                        <CheckboxComponent
                          label={item.label}
                          value={item.value}
                          setCheckboxDate={setCheckboxDate}
                          checkedValue={item.checked}
                        />
                      </View>
                    );
                  })}
              </View>
              <View>
                <Text style={{ color: '#000000', fontSize: 14 }}>
                  Price Range
                </Text>
                <Slider
                  style={{ height: 40 }}
                  minimumValue={0}
                  maximumValue={maxPrice}
                  minimumTrackTintColor="#FF7454"
                  maximumTrackTintColor="#000000"
                  value={filterData && filterData?.priceTo ? filterData?.priceTo : 0}
                  onValueChange={value => setPrice(parseInt(value))}
                />
              </View>
              <View style={searchStyles.textCon}>
                <Text>${minPrice}</Text>
                <Text>${price}</Text>
                <Text>${maxPrice}</Text>
              </View>
              <View>
                <Text style={{ color: '#000000', fontSize: 14 }}>
                  Distance Range
                </Text>
                <Slider
                  style={{ height: 40 }}
                  minimumValue={0}
                  maximumValue={maxDistance}
                  value={filterData && filterData?.distance ? filterData?.distance : 0}
                  minimumTrackTintColor="#FF7454"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setDistance(parseInt(value))}
                />
              </View>
              <View style={searchStyles.textCon}>
                <Text>{minDistance}  Mile</Text>
                <Text>{distance} Mile</Text>
                <Text>{maxDistance} Mile</Text>
              </View>
            </Grid>
          </Card>
        </ScrollView>
      </View>
      <Grid style={searchStyles.filterBtn}>
        <Col>
          <Button
            mode="outlined"
            style={{ margin: 20 }}
            labelStyle={searchStyles.cancelBtn}
            onPress={() => clearFilter()}>
            Clear
          </Button>
        </Col>
        <Col>
          <Button
            mode="contained"
            style={{ margin: 20, backgroundColor: '#FF7454' }}
            labelStyle={searchStyles.nextBtn}
            onPress={() => searchFilter()}>
            Apply
          </Button>
        </Col>
      </Grid>
    </>
  );
};

const searchStyles = StyleSheet.create({
  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  cardPadding: {
    padding: 15,
  },
  SelectDropdown: {
    width: '100%',
  },
  dropdown: {
    // margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    borderColor: '#999999',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#000000',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownText: {
    color: '#000000',
    fontSize: 14,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 5,
  },
  dropdownText2: {
    color: '#000000',
    fontSize: 14,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 5,
  },
  boder: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 6,
  },
  filterBtn: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
  },
  cancelBtn: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'normal',
    letterSpacing: 0,
    textTransform: 'capitalize',
  },
  nextBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0,
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 30,
    borderWidth: 1,
    padding: 8,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  item: {
    width: '50%',
  },
});

export default CommonFilterScreen;
