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
import PicturesHorz from './PicturesHorz'
import PicturesToVideo from './PicturesToVideo'

export default class App extends React.Component {

  render(){
    return(
      <View>
        {/* <Pictures /> */}
        {/* <PicturesHorz /> */}
        <PicturesToVideo />
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
