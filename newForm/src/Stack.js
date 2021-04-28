import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack' 
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home'
import AboutScreen from './screens/About'

const Stack = createStackNavigator();

const HeaderRight = () => {
  const navigation = useNavigation();

  return(
    <View style={{flexDirection: 'row', paddingRight: 15}}>
        <TouchableOpacity 
          onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
        >
          <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
        </TouchableOpacity>
    </View>

  )
}

const StackComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions = {{
        headerRight: () => <HeaderRight />,
      }}
    >

      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          title: "제목 바꿀 수 있다",
        }}
      />
      <Stack.Screen 
        name="About"
        component={AboutScreen}

      />
    </Stack.Navigator>
  )
}

export default StackComponent 