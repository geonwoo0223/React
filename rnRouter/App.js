import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'

import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './components/IconWithBadge'

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import TutorialScreen from './screens/TutorialScreen';

import {DrawerActions} from 'react-navigation-drawer'

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={3} />;
};

// import { App } from './views/index'

// const AppContainer = createAppContainer(App);

// export default () => (
//   <AppContainer />
// );

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Chat') {
          iconName = 'chatbubbles';
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        }
        return (
          <IconComponent 
            name={iconName}
            size={horizontal ? 20: 25}
            color={tintColor}
          />
        );
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



const App = createStackNavigator({

  screen: TutorialScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#633689',
      },
      headerTintColor: '#FFFFFF',
      title: 'React Native Tutorial',
      headerLeft: (
        <TouchableOpacity 
          style={{paddingLeft: 10}} 
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
        </TouchableOpacity>
      )
    },
  },
});



export default createAppContainer(App);
