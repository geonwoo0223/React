import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Header } from 'react-native-elements'

import Ionicons from 'react-native-vector-icons/Ionicons';
import store from '../store';


export default class SettingsScreen extends React.Component {

  startTravel = () => {
    this.props.navigation.navigate('About')
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>
          Hello
        </Text>
        <Button title={"go to About"} onPress={this.startTravel}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
