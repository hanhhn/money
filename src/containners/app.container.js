import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserSignedIn, SignedIn, SignIn} from '../actions/auth.action';
import {ACCESS_TOKEN} from '../constants';
import RootContainer from '../containners/root.container';
import SignInSceen from '../screens/sign-in.screen.js';
import * as storageService from '../cores/services/storage.service';

class AppContainer extends Component {
  UNSAFE_componentWillMount() {
    const {onUserSignedIn} = this.props;

    storageService._getStoreData(ACCESS_TOKEN).then(token => {
      if (token) {
        onUserSignedIn(token);
      }
    });
  }

  render() {
    const {isLogged} = this.props.auth;

    const signInProps = {
      auth: this.props.auth,
      onUserSignedIn: this.props.onUserSignedIn,
      onSignedIn: this.props.onSignedIn,
      onSignIn: this.props.onSignIn,
    };

    return isLogged ? <RootContainer /> : <SignInSceen {...signInProps} />;
  }
}

export default connect(
  state => {
    return {
      auth: state.authReducer,
    };
  },
  dispatch => {
    return {
      onUserSignedIn: token => dispatch(UserSignedIn(token)),
      onSignedIn: (logged, token) => dispatch(SignedIn(logged, token)),
      onSignIn: func => dispatch(SignIn(func)),
    };
  },
)(AppContainer);
