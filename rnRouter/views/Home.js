import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

class Home extends Component {
  render() {
    return (
      <View style={styles.eachView} >
        <Text>This is Home Screen</Text>
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
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

export { Home }

