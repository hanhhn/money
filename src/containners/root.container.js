import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootScreen from '../screens/root.screen';

class RootContainer extends Component {
  render() {
    return <RootScreen {...this.props} />;
  }
}

export default connect()(RootContainer);
