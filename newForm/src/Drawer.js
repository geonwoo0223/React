import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
 } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons';

import StackComponent from './Stack'

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem 
        label="설정"
      />
    </DrawerContentScrollView>
  )
}


const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerType="front"
      drawerPosition='right'
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="App" component={StackComponent}/>
    </Drawer.Navigator>
  )
}

export default DrawerComponent