import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, useState} from 'react-native'


import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login'

export default class App extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      result: '',
    }
  }
  
  
  
  render(){
      const signInWithKakao = async () => {
        await login()
        .then(res => {
          console.log(res)
          const result = JSON.stringify(res)
          this.setState({
            result: result
          })
        }) .catch(err => 
          console.log(err))
      };
      
      const getProfile = async () => {
        await getKakaoProfile()
        .then(res => {
          console.log(res)
          const result = JSON.stringify(res)
          this.setState({
            result: result
          })
        }) .catch(err => 
          console.log(err)
        )
      };

      const unlinkKakao = async () => {
        await unlink()
        .then(res => {
          console.log(res)
          const result = JSON.stringify(res)
          this.setState({
            result: result
          })
        }) .catch(err => 
          console.log(err)
        )
      };


      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text>{this.state.result}</Text>
        <TouchableOpacity style={{backgroundColor: 'yellow'}} onPress={() => signInWithKakao()}>
          <Text style={{ fontSize: 40 }}> 카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'brown', marginVertical: 10}} onPress={() => signOutWithKakao()}>
          <Text style={{ fontSize: 40 }}> 카카오 로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => getProfile()}>
          <Text style={{ fontSize: 40 }}> 프로필 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'skyblue'}} onPress={() => unlinkKakao()}>
          <Text style={{ fontSize: 40 }}> 카카오톡 연결 해제</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
