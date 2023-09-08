import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL } from '../constants/Config';
import { useDispatch, useSelector } from 'react-redux';
import { fileUpload } from './../../store/features/common/commonSlice';

const ImageUploadComponent = ({
  setProfileImage,
  profileImage,
  setImages,
  param,
}) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const { fileData } = useSelector(state => state.commonData);
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

      // imageUpload(imageData);
      dispatch(fileUpload(image));
      setImages(param, fileData);
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
      // imageUpload(imageDataGallery);
      dispatch(fileUpload(imageDataGallery));
      setImages(param, fileData);
      refRBSheet.current.close();
    });
  };

  // const imageUpload = formdata => {
  //   fetch(`${BASE_URL}upload/uploadFile`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formdata,
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       // setInputs(prevState => ({...prevState, photo: json.data}));
  //       // setImages(param, json.data);
  //     })
  //     .catch(error => {
  //       // setIsLoading(false);
  //       console.error(error);
  //     });
  // };

  return (
    <>
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
            <Text style={{ color: '#000000', marginLeft: 14, fontSize: 15 }}>
              Upload your photo
            </Text>
          </View>
        )}
      </TouchableOpacity>
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
  dropdownText: {
    color: '#000000',
    fontSize: 14,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 5,
  },
});

export default ImageUploadComponent;
