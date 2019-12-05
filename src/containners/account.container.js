import React, {Component} from 'react';
import {connect} from 'react-redux';
import AccountScreeen from '../screens/account.screen';
import {SignOut} from '../actions/auth.action';

class AccountContainer extends Component {
  render() {
    const {onSignOut} = this.props;
    return <AccountScreeen onSignOut={onSignOut} />;
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
      onSignOut: () => dispatch(SignOut()),
    };
  },
)(AccountContainer);
