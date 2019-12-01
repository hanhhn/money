import React, {Component} from 'react';
import {Provider} from 'react-redux';
import appStore from './app.store';
import RootContainer from './containners/root.container';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={appStore}>
        <RootContainer />
      </Provider>
    );
  }
}
