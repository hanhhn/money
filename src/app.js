import React, {Component} from 'react';
import {Provider} from 'react-redux';
import appStore from './app.store';
import AppContainer from './containners/app.container';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={appStore}>
        <AppContainer />
      </Provider>
    );
  }
}
