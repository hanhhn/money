import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootScreen from '../screens/root.screen';
import {CheckSignedIn} from '../actions/account.action';

class RootContainer extends Component {
  componentWillMount() {
    const {onCheckSignedIn} = this.props;
    onCheckSignedIn();
  }

  render() {
    const {isSignedIn} = this.props.account;
    return <RootScreen isSignedIn={isSignedIn} />;
  }
}

export default connect(
  state => {
    return {
      account: state.accountReducer,
    };
  },
  dispatch => {
    return {
      onCheckSignedIn: () => dispatch(CheckSignedIn()),
    };
  },
)(RootContainer);
