import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CounterContainer from '../containners/counter.container';

export default class OutputScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello, InputScreen!</Text>
        <CounterContainer />
      </View>
    );
  }
}
