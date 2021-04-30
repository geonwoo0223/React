import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

import { Provider } from 'react-redux'

import store from './src/store/index'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <DrawerComponent />
        </NavigationContainer>
      </Provider>
    )
  }
}

