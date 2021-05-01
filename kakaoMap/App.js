import React from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { WebView } from 'react-native-webview'

export default class App extends React.Component{

  message = "<h1>hello World</h1>"



  render() {

    return (
      <WebView 
      
        source={{ uri: "http://localhost:3000"}}
      />
       

    )
  }
}