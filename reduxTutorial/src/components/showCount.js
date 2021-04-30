import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '.././store/actions';

class ShowCount extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={{ fontSize: 20 }}>{this.props.count}</Text>
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


export default connect(mapStateToProps)(ShowCount);