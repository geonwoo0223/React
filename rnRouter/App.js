import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './components/IconWithBadge'

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';



// import { App } from './views/index'

// const AppContainer = createAppContainer(App);

// export default () => (
//   <AppContainer />
// );

const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Chat') {
          iconName = 'chatbubbles';
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        }
        if (routeName === 'Chat') {
          return (
            <IconWithBadge
              name={iconName}
              size={horizontal ? 20: 25}
              color={tintColor}
              badgeCount={3}
            />
          );
        } else {
          return (
            <Ionicons 
              name={iconName}
              size={horizontal ? 20: 25}
              color={tintColor}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'black',
        paddingTop: 10,
      },
    },
  },
);

export default createAppContainer(TabNavigator);