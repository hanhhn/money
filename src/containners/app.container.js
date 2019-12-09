import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignInSceen from '../screens/sign-in.screen.js';
import {UserSignedIn, SignedIn, SignIn} from '../actions/auth.action';
import * as storageService from '../cores/services/storage.service';
import {ACCESS_TOKEN} from '../constants';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RootScreen from '../screens/root.screen';
import IncomingScreen from '../screens/incoming.screen';
import {HideIncoming, ShowIncoming} from '../actions/incoming.action';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    const mainNavigator = createStackNavigator(
      {
        RootScreen: {
          screen: RootScreen,
        },
        IncomingScreen: {
          screen: IncomingScreen,
        },
      },
      {
        initialRouteName: 'RootScreen',
        lazy: true,
        headerMode: 'none',
        tabBarOptions: {
          activeTintColor: '#ffaf40',
        },
      },
    );

    this.mainNavigator = createAppContainer(mainNavigator);
  }

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
    const MainScreen = this.mainNavigator;

    const mainProps = {
      incoming: this.props.incoming,
      onShowIncoming: this.props.onShowIncoming,
      onHideIncoming: this.props.onHideIncoming,
    };

    const signInProps = {
      auth: this.props.auth,
      onUserSignedIn: this.props.onUserSignedIn,
      onSignedIn: this.props.onSignedIn,
      onSignIn: this.props.onSignIn,
    };

    return isLogged ? (
      <MainScreen screenProps={mainProps} />
    ) : (
      <SignInSceen {...signInProps} />
    );
  }
}

export default connect(
  state => {
    return {
      auth: state.authReducer,
      incoming: state.incomingReducer,
    };
  },
  dispatch => {
    return {
      onUserSignedIn: token => dispatch(UserSignedIn(token)),
      onSignedIn: (logged, token) => dispatch(SignedIn(logged, token)),
      onSignIn: func => dispatch(SignIn(func)),
      onShowIncoming: () => dispatch(ShowIncoming()),
      onHideIncoming: () => dispatch(HideIncoming()),
    };
  },
)(AppContainer);
