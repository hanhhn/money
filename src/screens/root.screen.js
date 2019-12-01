import React, {Component} from 'react';
import RootRouter from './_router';
import SignInContainer from '../containners/sign-in.container';

export default class RootScreen extends Component {
  render() {
    return this.props.isSignedIn ? <RootRouter /> : <SignInContainer />;
  }
}
