import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Counter from './src/screens/Counter';
import StaticCounter from './src/screens/StaticCounter';
import store from './src/store';
import StackComponent from './src/stack';


// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <StackComponent />
    </Provider>
  );
}
