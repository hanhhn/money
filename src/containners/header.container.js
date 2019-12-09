import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/header.component';
import {ShowIncoming} from '../actions/incoming.action';

class HeaderContainer extends Component {
  render() {
    return <Header {...this.props} />;
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
    };
  },
)(HeaderContainer);
