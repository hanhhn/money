import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootScreen from '../screens/root.screen';
import {ShowIncoming, HideIncoming} from '../actions/incoming.action';

class RootContainer extends Component {
  render() {
    return <RootScreen {...this.props} />;
  }
}

export default connect(
  state => {
    return {
      incoming: state.incomingReducer,
    };
  },
  dispatch => {
    return {
      onShowIncoming: () => dispatch(ShowIncoming()),
      onHideIncoming: () => dispatch(HideIncoming()),
    };
  },
)(RootContainer);
