import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack' 
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home'
import AboutScreen from './screens/About'
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';

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

const isLogin = false;

const initialRouteName = () => {
  if (isLogin) {
    return "Home"
  } else {
    return "Login"
  }
}

const StackComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName()}
      screenOptions = {{
        headerRight: () => <HeaderRight />,
      }}
    >
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false
        }}
      />
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