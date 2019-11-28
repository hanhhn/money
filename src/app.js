import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import appStore from './app.store';
import RootRouter from './router';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={appStore}>
        <RootRouter />
      </Provider>
    );
  }
}
