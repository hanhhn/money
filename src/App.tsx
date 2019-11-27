import React, {Component} from 'react';
import {Text, View, Navigator} from 'react-native';
import {Provider} from 'react-redux';
import appStore from './App.store';

export default class App extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Provider store={appStore}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Hello, world!</Text>
        </View>
      </Provider>
    );
  }
}
