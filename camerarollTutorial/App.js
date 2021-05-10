import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import Pictures from './Pictures'

export default class App extends React.Component {

  render(){
    return(
      <View>
        <Pictures />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
