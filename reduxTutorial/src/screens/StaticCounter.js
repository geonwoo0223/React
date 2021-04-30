import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

class StaticCounter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={s.container}>
        <Text>{this.props.count}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(StaticCounter);