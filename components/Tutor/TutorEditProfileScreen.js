import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import CompleteBar from './../common/CompleteBar';
import PointLabel from './../common/PoinLabel';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DatePicker from 'react-native-date-picker';
import { Button, Appbar, Text } from 'react-native-paper';
import Input from './../common/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL } from './../constants/Config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../common/Loader';
import { signupStoreData, typeList } from '../../store/features/common/commonSlice';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import AppbarViewComponent from '../common/AppbarViewComponent';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import SubmitButton from '../common/SubmitButton';
import { ButtonArrow } from '../../assets/images';
import { useCallback } from 'react';
import { tutorDetails } from '../../store/features/tutorCourse/tutorProfileSlice';

const TutorEditProfileScreen = ({ navigation, route }) => {
  Geocoder.init('AIzaSyDtPFbGZM7FWj_esKZVrHngKLXBA6uvIno');

  const { user } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.tutorProfile);

  const { selectedCoordinate } = route.params || {};
  const { signupData } = useSelector(
    state => state.commonData,
  );

  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const refRBSheetGovtId = useRef();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [inputs, setInputs] = useState({
    photo: '',
    governmentID: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    dob: date.toLocaleDateString(),
    zipCode: '',
    address: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
  });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [idProofImage, setIdProofImage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTutorDetails = useCallback(async () => {
    dispatch(tutorDetails(user._id));
  }, []);

  useEffect(() => {
    fetchTutorDetails();
    dispatch(typeList());
  }, [fetchTutorDetails])

  const updateProfileData = useCallback(async () => {
    if (selectedCoordinate) {
      updateLocation(selectedCoordinate);
    }
    setInputs({
      photo: profile?.personalDetails?.photo,
      governmentID: profile?.personalDetails?.governmentID,
      firstName: profile?.personalDetails?.firstName,
      lastName: profile?.personalDetails?.lastName,
      phoneNo: profile?.personalDetails?.phoneNo,
      dob: (profile?.personalDetails?.dob),
      zipCode: profile?.personalDetails?.zipCode,
      address: selectedCoordinate ? selectedCoordinate : profile?.personalDetails?.address,
      location: profile?.location
    })

    setProfileImage(profile?.personalDetails?.photo);
    setIdProofImage(profile?.personalDetails?.governmentID);
  }, [profile])

  useEffect(() => {
    updateProfileData();
  }, [updateProfileData])

  useEffect(() => {
    // fetchStoreData();
    dispatch(typeList());
  }, []);

  useEffect(() => {
    hasLocationPermission();
  }, []);
  useEffect(() => {
    if (selectedCoordinate && Object.keys(selectedCoordinate).length > 0) {
      updateLocation(selectedCoordinate);
    }
  }, [selectedCoordinate]);

  const updateLocation = selectedCoordinate => {
    Geocoder.from(selectedCoordinate?.latitude, selectedCoordinate?.longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        handleOnChange(addressComponent, 'address');
        handleOnChange(
          {
            type: 'Point',
            coordinates: [
              selectedCoordinate?.latitude,
              selectedCoordinate?.longitude,
            ],
          },
          'location',
        );
      })
      .catch(error => console.warn(error));
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          setCoordinates({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
        },
        error => {
          // See error code charts below.
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  // const fetchStoreData = async () => {
  //   const userRegisterData = await AsyncStorage.getItem('userProfileData');
  //   if (userRegisterData) {
  //     const storageData = JSON.parse(userRegisterData);
  //     console.log(storageData, '%%%%%%%%%%%')
  //     setInputs(storageData);
  //     setProfileImage(storageData.photo);
  //     setIdProofImage(storageData.governmentID);
  //   }
  // };

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.photo) {
      handleError('Profile is required', 'photo');
      valid = false;
    }
    if (!inputs.governmentID) {
      handleError('Government Id is required', 'governmentID');
      valid = false;
    }
    if (!inputs.firstName) {
      handleError('first Name is required', 'firstName');
      valid = false;
    }
    if (!inputs.lastName) {
      handleError('Last Name is required', 'lastName');
      valid = false;
    }
    if (!inputs.phoneNo) {
      handleError('Phone Number is required', 'phoneNo');
      valid = false;
    }
    if (!inputs.dob) {
      handleError('Date Of Birth is required', 'dob');
      valid = false;
    }
    if (!inputs.zipCode) {
      handleError('Zipcode is required', 'zipCode');
      valid = false;
    }

    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.phoneNo &&
      inputs.dob &&
      inputs.zipCode &&
      inputs.photo &&
      inputs.governmentID
    ) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      // await AsyncStorage.setItem('userProfileData', JSON.stringify(inputs));
      const newSignupData = { ...signupData, ...inputs }
      dispatch(signupStoreData(newSignupData))
      navigation.navigate('TutorEditExperience', { profile: profile });
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
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
        setInputs(prevState => ({ ...prevState, photo: json.data }));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  const ChooseOptionGovt = () => {
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
            onPress={() => chooseFromCameraGovt()}>
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
            onPress={() => chooseFromGalleryGovt()}>
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

  const chooseFromCameraGovt = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setIdProofImage(image.path);
      const imageData = new FormData();
      imageData.append('file', {
        uri: image.path,
        name: 'profile.png',
        type: 'image/png',
      });
      imageUploadGovt(imageData);
      refRBSheetGovtId.current.close();
    });
  };

  const chooseFromGalleryGovt = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setIdProofImage(image.path);
      const imageDataGallery = new FormData();
      imageDataGallery.append('file', {
        uri: image.path,
        name: 'profile.png',
        type: 'image/png',
      });
      imageUploadGovt(imageDataGallery);
      refRBSheetGovtId.current.close();
    });
  };

  const imageUploadGovt = formdata => {
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
        setInputs(prevState => ({ ...prevState, governmentID: json.data }));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppbarViewComponent title={'Update Profile'} icon={"arrow-left-thin-circle-outline"}
          navigatePressed={() => navigation.goBack()} />
        <DatePicker
          modal
          mode={'date'}
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setInputs(prevState => ({
              ...prevState,
              dob: new Date(date).toLocaleDateString(),
            }));
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <ScrollView
          style={[MainStyleSheet.scrollView]}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* <View style={OnboardingStyles.headerContent}>
            <View style={{ paddingHorizontal: 20, width: '100%' }}>
              <CompleteBar title={'Step 1 of 3'} percentage={'30%'} />
            </View>
          </View> */}
          {loading ? (
            <Loader />
          ) : (
            <View
              style={{ paddingHorizontal: 10, marginBottom: 20, marginTop: 5 }}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                {profileImage ? (
                  <View style={Styles.imgUploadView}>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 50 }}
                      source={{ uri: profileImage }}
                    />
                  </View>
                ) : (
                  <View style={Styles.imgUploadView}>
                    <View style={Styles.img}>
                      <View style={Styles.plusIcon}>
                        <Image
                          style={{ height: 20, width: 20 }}
                          source={require('../../assets/images/add.png')}
                        />
                      </View>
                    </View>
                    <Text
                      style={{ color: '#000000', marginLeft: 14, fontSize: 15 }}>
                      Upload your photo
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {errors.photo && !profileImage && (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  {errors.photo}
                </Text>
              )}
              <TouchableOpacity onPress={() => refRBSheetGovtId.current.open()}>
                {idProofImage ? (
                  <View style={Styles.imgUploadView}>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 50 }}
                      source={{ uri: idProofImage }}
                    />
                  </View>
                ) : (
                  <View style={Styles.imgUploadView}>
                    <Image
                      style={{ height: 27, width: 42 }}
                      source={require('../../assets/images/upload.png')}
                    />
                    <Text
                      style={{ color: '#000000', marginLeft: 25, fontSize: 15 }}>
                      Upload your government ID
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {errors.governmentID && !idProofImage && (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  {errors.governmentID}
                </Text>
              )}
              <Input
                label="First Name"
                placeholder="Enter First Name"
                onChangeText={text => handleOnChange(text, 'firstName')}
                error={errors.firstName}
                value={inputs.firstName}
                onFocus={() => {
                  handleError(null, 'firstName');
                }}
              />
              <Input
                label="Last Name"
                placeholder="Enter Last Name"
                onChangeText={text => handleOnChange(text, 'lastName')}
                error={errors.lastName}
                value={inputs.lastName}
                onFocus={() => {
                  handleError(null, 'lastName');
                }}
              />
              <Input
                label="Phone Number"
                placeholder="Enter Phone Number"
                onChangeText={text => handleOnChange(text, 'phoneNo')}
                error={errors.phoneNo}
                value={inputs.phoneNo}
                keyboardType="numeric"
                onFocus={() => {
                  handleError(null, 'phoneNo');
                }}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Input
                  label="Date of Birth"
                  placeholder="Enter Date of Birth"
                  editable={false}
                  value={inputs.dob}
                  date
                />
              </TouchableOpacity>
              <Input
                label="Zipcode"
                placeholder="Enter Zipcode"
                onChangeText={text => handleOnChange(text, 'zipCode')}
                error={errors.zipCode}
                value={inputs.zipCode}
                keyboardType="numeric"
                onFocus={() => {
                  handleError(null, 'zipCode');
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Map', {
                    coordinates,
                    redirectPath: 'TutorProfile',
                  })
                }>
                <Input
                  label="Location"
                  placeholder="Choose Location"
                  value={inputs?.address}
                  editable={false}
                />
              </TouchableOpacity>
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <SubmitButton title="Click to Proceed" onPress={validate} buttonWidth={198}
                  icon={<ButtonArrow />}
                />
              </View>
            </View>
          )}
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
          <RBSheet
            ref={refRBSheetGovtId}
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
            <ChooseOptionGovt />
          </RBSheet>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  imgUploadView: {
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'dashed',
    marginTop: 25,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
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
});

const multiSelectStyles = StyleSheet.create({
  dropdown: {
    height: 55,
    backgroundColor: 'transparent',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 25,
    paddingLeft: 14,
    paddingRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  selectedStyle: {
    borderRadius: 50,
    backgroundColor: '#FFD9CF',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
});

export default TutorEditProfileScreen;
