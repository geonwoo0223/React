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

export default class HomeScreen extends React.Component {

  startTravel = () => {
    this.props.navigation.navigate('About')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          leftComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        /> */}
        <Text>
          지도가 보여지는 홈화면
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
