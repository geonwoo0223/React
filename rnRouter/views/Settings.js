import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'


class Settings extends Component {
  render() {
    return (
      <View style={styles.eachView} >
        <Text>This is Setting Screen</Text>
        <Button
          title="Go to Home"
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

export { Settings }