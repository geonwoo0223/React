import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

class Chat extends Component {
  render() {
    return (
      <View style={styles.eachView} >
        <Text>This is Chat Screen</Text>
        <Button
          title="Go to Home Screen"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  eachView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export { Chat }