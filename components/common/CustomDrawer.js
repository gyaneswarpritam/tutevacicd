import React, { useContext } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/features/auth/authSlice';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const { user, userRole } = useSelector(state => state.auth);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#fff', marginTop: 0 }}>
        <ImageBackground
          source={require('./../../assets/images/navBg.png')}
          style={{ padding: 40, backgroundColor: '#73708B' }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              fontSize: 12,
              color: '#fff',
            }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Star Guru
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>
              {props.role} View
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>
              {user?.personalDetails?.firstName} {user?.personalDetails?.lastName}
            </Text>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>
              {user.email}
            </Text>
          </View>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* <DrawerContentScrollView {...props}>
        <DrawerItem label="Logout" onPress={() => logout()} />
      </DrawerContentScrollView> */}
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        <TouchableOpacity
          onPress={() => { }}
          style={{ paddingVertical: 10, fontSize: 22, fontWeight: 'bold' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="share-variant-outline" size={22} color={"#000000"} />
            <Text style={{ fontSize: 15, marginLeft: 5, color: '#000000' }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
          }}
          style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout-variant" size={22} color={"#000000"} />
            <Text style={{ fontSize: 15, marginLeft: 5, color: '#000000' }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        <Text style={{ textAlign: 'center', color: "#000000" }}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
