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


export default class LoginScreen extends React.Component {

  login = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' }
        ]
      })
    )
  }
  

  signup = () => {
    this.props.navigation.navigate('Signup')
  }

  render() {

    return (
      <View style={styles.container}>

        <Text>
          로그인 화면
        </Text>
        <Button title={"로그인"} onPress={this.login}/>
        <Button title={"회원가입"} onPress={this.signup}/>
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

