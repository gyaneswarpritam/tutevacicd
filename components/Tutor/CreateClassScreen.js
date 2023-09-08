import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  Appbar,
  Divider,
  RadioButton,
  Text,
} from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { BASE_URL } from '../constants/Config';
import Input from '../common/Input';
import DropdownComponent from '../common/DropdownComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  tutorCourseDetails,
  levelList,
  courseFormCreate,
} from '../../store/features/tutorCourse/tutorCourseSlice';
import {
  industryList,
  skillsList,
  specializationList,
} from '../../store/features/common/commonSlice';
import MultiSelectComponent from '../common/MultiSelectComponent';
import Loader from '../common/Loader';
import AppbarViewComponent from '../common/AppbarViewComponent';
import SubmitButton from '../common/SubmitButton';
import { useTheme } from '@react-navigation/native';
import Textarea from '../common/Textarea';
import { Grid, Row, Col } from 'react-native-easy-grid';

const CreateClassScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { user } = useSelector(state => state.auth);
  const { coureseDetails, categories, levels, isLoading, isSuccess } =
    useSelector(state => state.tutorCourse);
  const { industry, specialization, skills } = useSelector(
    state => state.commonData,
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [changeValue, setChangeValue] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [classLevel, setClassLevel] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState('');
  const [editSkillsValue, setEditSkillsValue] = useState([]);
  const [mode, setMode] = useState('');
  const [inputs, setInputs] = useState({
    media: '',
    name: '',
    description: '',
    level: '',
    industry: '',
    specialization: '',
    skills: [],
    objective: '',
    prerequistie: '',
    size: '',
    amount: '',
    paymentMode: '',
    teachingMode: '',
    address: '',
    meetingLink: ''
  });
  const refRBSheet = useRef();

  // useEffect(() => {
  //   if (route && route.params) {
  //     dispatch(industryList({}));
  //   }
  // }, []);
  const fetchClassDetails = useCallback(async () => {
    const { id } = route.params;
    if (id) {
      setEditId(id);
      let courseDetailsByID = {};
      if (coureseDetails) {
        courseDetailsByID = coureseDetails.data;
        setClassDetails(courseDetailsByID);
        handleSpecializationList(courseDetailsByID?.industry?._id);
        handleSkillsList(courseDetailsByID?.specialization?._id);
        setInputs({
          media: courseDetailsByID?.media,
          name: courseDetailsByID?.name,
          description: courseDetailsByID?.description,
          level: courseDetailsByID?.level?._id,
          industry: courseDetailsByID?.industry?._id,
          specialization: courseDetailsByID?.specialization?._id,
          skills: courseDetailsByID?.skills,
          objective: courseDetailsByID?.objective,
          prerequistie: courseDetailsByID?.prerequistie,
          size: (courseDetailsByID?.size)?.toString(),
          amount: (courseDetailsByID?.amount)?.toString(),
          paymentMode: courseDetailsByID?.payment,
          teachingMode: courseDetailsByID?.teachingMode,
          address: courseDetailsByID?.address,
          meetingLink: courseDetailsByID?.meetingLink
        });
        setEditSkillsValue(courseDetailsByID?.skills);
        setProfileImage(courseDetailsByID?.media);
      }
    }
  }, []);

  useEffect(() => {
    if (route?.params && route?.params?.id) {
      fetchClassDetails();
    }
  }, [token, route?.params?.id]);

  // useEffect(() => {
  //   dispatch(levelList({}));
  // }, [token]);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name) {
      handleError('Class Name is required', 'name');
      valid = false;
    }
    if (!inputs.description) {
      handleError('Description is required', 'description');
      valid = false;
    }
    if (!inputs.level) {
      handleError('Level is required', 'level');
      valid = false;
    }
    if (!inputs.objective) {
      handleError('Objective is required', 'objective');
      valid = false;
    }
    if (!inputs.size) {
      handleError('Class Size is required', 'size');
      valid = false;
    }
    if (!inputs.amount) {
      handleError('Class Fee is required', 'amount');
      valid = false;
    }
    if (!inputs.prerequistie) {
      handleError('prerequistie is required', 'prerequistie');
      valid = false;
    }
    if (!inputs.media) {
      handleError('Cover Image for Course is required', 'media');
      valid = false;
    }

    if (
      inputs.name &&
      inputs.description &&
      inputs.level &&
      inputs.objective &&
      inputs.prerequistie &&
      inputs.size &&
      inputs.media &&
      inputs.amount
    ) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      if (editId) {
        dispatch(courseFormCreate(inputs));
        navigation.navigate('ScheduleCourse', { editData: editId });
      } else {
        dispatch(courseFormCreate(inputs));
        navigation.navigate('ScheduleCourse');
      }
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const selectedItems = text => {
    setInputs(prevState => ({ ...prevState, skills: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const ChooseOption = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#FF7454', borderRadius: 50 }}
            onPress={() => chooseFromCamera()}>
            <MaterialIcons
              name="photo-camera"
              size={22}
              style={{
                fontSize: 40,
                color: '#fff',
                padding: 10,
              }}></MaterialIcons>
          </TouchableOpacity>
          <Text>Camera</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#FF7454', borderRadius: 50 }}
            onPress={() => chooseFromGallery()}>
            <MaterialIcons
              name="collections"
              size={22}
              style={{
                fontSize: 40,
                color: '#fff',
                padding: 10,
              }}></MaterialIcons>
          </TouchableOpacity>
          <Text>Gallery</Text>
        </View>
      </View>
    );
  };

  const chooseFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setProfileImage(image.path);
      const imageData = new FormData();
      imageData.append('file', {
        uri: image.path,
        name: 'profile.png',
        type: 'image/png',
      });
      imageUpload(imageData);
      refRBSheet.current.close();
    });
  };

  const chooseFromGallery = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setProfileImage(image.path);
      const imageDataGallery = new FormData();
      imageDataGallery.append('file', {
        uri: image.path,
        name: 'profile.png',
        type: 'image/png',
      });
      imageUpload(imageDataGallery);
      refRBSheet.current.close();
    });
  };

  const imageUpload = formdata => {
    setLoading(true);
    fetch(`${BASE_URL}upload/uploadFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        setInputs(prevState => ({ ...prevState, media: json.data }));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleSpecializationList = industryId => {
    dispatch(specializationList({ industry: industryId }));
    setChangeValue(industryId);
  };
  const handleSkillsList = specializationId => {
    dispatch(skillsList({ specialization: specializationId }));
    setChangeValue(specializationId);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppbarViewComponent title={editId ? 'Edit Course' : 'Create Course'} icon={"arrow-left-thin-circle-outline"}
          navigatePressed={() => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={[MainStyleSheet.scrollView]}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {loading ? <Loader /> : <View
            style={{ marginTop: 5 }}>
            <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin]}>
              Enter all the details below
            </Text>
            <Input
              label="Course Name"
              placeholder="Enter Course Name"
              onChangeText={text => handleOnChange(text, 'name')}
              value={inputs.name}
              error={errors.name}
              onFocus={() => {
                handleError(null, 'name');
              }}
            />
            <Textarea
              label="Course Description"
              placeholder="Enter Course Description"
              onChangeText={text => handleOnChange(text, 'description')}
              value={inputs.description}
              error={errors.description}
              onFocus={() => {
                handleError(null, 'description');
              }}
            />
            <DropdownComponent
              label="Industry"
              data={industry}
              value={inputs.industry}
              error={errors.industry}
              labelField="name"
              valueField="_id"
              onChange={item => {
                handleError(null, 'industry');
                handleOnChange(item._id, 'industry');
                handleSpecializationList(item._id);
              }}
            />
            <DropdownComponent
              label="Specialization"
              data={specialization}
              value={inputs.specialization}
              error={errors.specialization}
              labelField="name"
              valueField="_id"
              onChange={item => {
                handleError(null, 'specialization');
                handleOnChange(item._id, 'specialization');
                handleSkillsList(item._id);
              }}
            />
            {/* <DropdownComponent
                label="Skills"
                data={skills}
                value={inputs.skills}
                error={errors.skills}
                labelField="name"
                valueField="_id"
                onChange={item => {
                  handleError(null, 'skills');
                  handleOnChange(item._id, 'skills');
                }}
              /> */}
            <MultiSelectComponent
              data={skills}
              labelField="name"
              valueField="_id"
              selectedItems={items => selectedItems(items)}
              changeValue={changeValue}
              editSkillsValue={editSkillsValue}
            />
            <DropdownComponent
              labelField="name"
              valueField="_id"
              label="Level"
              data={levels}
              value={inputs.level}
              error={errors.level}
              onChange={item => {
                handleError(null, 'level');
                handleOnChange(item._id, 'level');
              }}
            />
            {/* <TextareaComponent
              lable="Objective for the course"
              value={inputs.objective}
              error={errors.objective}
              onChange={value => {
                handleError(null, 'objective');
                handleOnChange(value, 'objective');
              }}
            /> */}
            <Textarea
              label="Objective for the course"
              placeholder="Enter Class Size"
              onChangeText={text => handleOnChange(text, 'objective')}
              value={inputs.objective}
              error={errors.objective}
              onFocus={() => {
                handleError(null, 'objective');
              }}
            />
            <Input
              label="Class Size"
              placeholder="Enter Class Size"
              onChangeText={text => handleOnChange(text, 'size')}
              value={inputs?.size}
              keyboardType="numeric"
              error={errors?.size}
              onFocus={() => {
                handleError(null, 'size');
              }}
            />
            <Input
              label="Class Fees"
              placeholder="Enter Class Fees"
              onChangeText={text => handleOnChange(text, 'amount')}
              error={errors.amount}
              value={inputs.amount}
              keyboardType="numeric"
              onFocus={() => {
                handleError(null, 'amount');
              }}
            />
            {/* <TextareaComponent
              lable="Prerequistie"
              value={inputs.prerequistie}
              error={errors.prerequistie}
              onChange={value => {
                handleError(null, 'prerequistie');
                handleOnChange(value, 'prerequistie');
              }}
            /> */}
            <Textarea
              label="Prerequistie"
              placeholder="Prerequistie"
              onChangeText={text => handleOnChange(text, 'prerequistie')}
              value={inputs.prerequistie}
              error={errors.prerequistie}
              onFocus={() => {
                handleError(null, 'prerequistie');
              }}
            />
            <Divider />
            <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin]}>
              Cover Image for Course
            </Text>
            <Grid style={{ marginVertical: 20 }}>
              <Row>
                <Col size={50}>
                  <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    {profileImage ? (
                      <View style={Styles.imgUploadView}>
                        <View style={Styles.imageUploadIcon}>
                          <Image
                            style={{ height: 70, width: 70, borderRadius: 50 }}
                            source={{ uri: profileImage }}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={Styles.imgUploadView}>
                        <View style={Styles.imageUploadIcon}>
                          <Feather
                            name="upload"
                            size={30}
                          ></Feather>
                        </View>
                        <Text style={{ textAlign: 'center' }}>Upload an Image</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </Col>
                <Col size={50}>
                  <Text
                    style={{ color: '#7E7E7E', marginLeft: 14, fontSize: 15 }}>
                    This image is shown in search results as thumbnail of the course.
                  </Text>
                </Col>
              </Row>
            </Grid>

            {errors.media && !profileImage && (
              <Text style={{ fontSize: 12, color: 'red' }}>
                {errors.media}
              </Text>
            )}
            <Divider />
            <View>
              <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10]}>
                Payment Terms
              </Text>
              <View style={MainStyleSheet.radioContainer}>
                <RadioButton.Group
                  value={inputs.paymentMode}
                  onValueChange={text => handleOnChange(text, 'paymentMode')}
                >
                  <View style={MainStyleSheet.radioButtonContainer}>
                    <RadioButton.Item
                      color="#F9B406"
                      labelStyle="#999999"
                      label="Monthly"
                      value="monthly"
                      style={MainStyleSheet.radioButtonReverse}
                    />
                    <RadioButton.Item
                      color="#F9B406"
                      labelStyle="#999999"
                      label="One Time"
                      value="oneTime"
                      style={MainStyleSheet.radioButtonReverse}
                    />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View>
              <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10]}>
                Teaching Mode
              </Text>
              <View style={MainStyleSheet.radioContainer}>
                <RadioButton.Group
                  value={inputs.teachingMode}
                  onValueChange={text => {
                    handleOnChange(text, 'teachingMode');
                    setMode(text);
                  }
                  }
                >
                  <View style={MainStyleSheet.radioButtonContainer}>
                    <RadioButton.Item
                      color="#F9B406"
                      labelStyle="#999999"
                      label="In Person"
                      value="inPerson"
                      style={MainStyleSheet.radioButtonReverse}
                    />
                    <RadioButton.Item
                      color="#F9B406"
                      labelStyle="#999999"
                      label="Online"
                      value="online"
                      style={MainStyleSheet.radioButtonReverse}
                    />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            {mode == 'inPerson' &&
              <Textarea
                label="Address"
                placeholder="Address"
                onChangeText={text => handleOnChange(text, 'address')}
                value={inputs.address}
                error={errors.address}
                onFocus={() => {
                  handleError(null, 'address');
                }}
              />}
            {mode == 'online' && <Input
              label="Meeting Link"
              placeholder="Enter Meeting Link"
              onChangeText={text => handleOnChange(text, 'meetingLink')}
              value={inputs?.meetingLink}
              error={errors?.meetingLink}
              onFocus={() => {
                handleError(null, 'meetingLink');
              }}
            />}
          </View>}
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <SubmitButton title="CLICK TO PROCEED" onPress={validate} buttonWidth={198}
              bgColor={'#222222'} btnTextColor={colors.primary}
            />
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="slide"
            customStyles={{
              container: {
                height: 150,
              },
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <ChooseOption />
          </RBSheet>
        </ScrollView >
      </SafeAreaView >
    </>
  );
};

const Styles = StyleSheet.create({
  subHeader: {
    height: 90,
    width: '100%',
    backgroundColor: '#302C54',
    paddingHorizontal: 14,
  },
  imgUploadView: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'dashed',
    borderRadius: 6,
  },
  imageUploadIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    marginTop: 20
  },
  docView: {
    height: 56,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 25,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 5,
  },
  boder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  radioStyle: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  boder: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 6,
  },
  dropdownText2: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 22,
    left: 10,
    zIndex: 5,
  },
});


export default CreateClassScreen;
