import React, {Component} from 'react';
import {
  SignInFacebook,
  SignInGoogle,
  SignInFailed,
} from '../actions/account.action';
import {connect} from 'react-redux';
import SignInSceen from '../screens/sign-in.screen.js';

class SignInContainer extends Component {
  render() {
    return <SignInSceen {...this.props} />;
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
      onSignInFacebook: () => dispatch(SignInFacebook()),
      onSignInGoogle: () => dispatch(SignInGoogle()),
      onSignInFailed: () => dispatch(SignInFailed()),
    };
  },
)(SignInContainer);
