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

import { CommonActions } from '@react-navigation/native'

export default class SignupScreen extends React.Component {

  signup = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' }
        ]
      })
    )
  }

  goBack = () => {
    this.props.navigation.dispatch(CommonActions.goBack())
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          leftComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        /> */}
        <Text>
          회원가입
        </Text>
        <Button title={"회원가입완료"} onPress={this.signup}/>
        <Button title={"뒤로가기"} onPress={this.goBack}/>
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
