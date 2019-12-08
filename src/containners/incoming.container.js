import React, {Component} from 'react';
import {connect} from 'react-redux';
import IncomingScreen from '../screens/incoming.screen';

class IncomingContainer extends Component {
  render() {
    return <IncomingScreen visible={true} />;
  }
}

export default connect()(IncomingContainer);
