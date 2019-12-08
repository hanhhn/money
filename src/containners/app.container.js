import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultScreen from '../screens/_screen';
import SignInSceen from '../screens/sign-in.screen.js';
import {UserSignedIn, SignedIn, SignIn} from '../actions/auth.action';
import * as storageService from '../cores/services/storage.service';
import {ACCESS_TOKEN} from '../constants';

class AppContainer extends Component {
  async UNSAFE_componentWillMount() {
    const {onUserSignedIn} = this.props;

    const token = await storageService._getStoreData(ACCESS_TOKEN);
    if (token) {
      onUserSignedIn(token);
    }
  }

  render() {
    const {isLogged} = this.props.auth;
    return isLogged ? <DefaultScreen /> : <SignInSceen {...this.props} />;
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
