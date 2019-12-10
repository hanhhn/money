import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootScreen from '../screens/root.screen';
import {ShowIncoming, HideIncoming} from '../actions/incoming.action';
import {ShowOutgoing, HideOutgoing} from '../actions/outgoing.action';

class RootContainer extends Component {
  render() {
    return <RootScreen {...this.props} />;
  }
}

export default connect(
  state => {
    return {
      incoming: state.incomingReducer,
      outgoing: state.outgoingReducer,
    };
  },
  dispatch => {
    return {
      onShowIncoming: () => dispatch(ShowIncoming()),
      onHideIncoming: () => dispatch(HideIncoming()),
      onShowOutgoing: () => dispatch(ShowOutgoing()),
      onHideOutgoing: () => dispatch(HideOutgoing()),
    };
  },
)(RootContainer);
