import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainScreen from '../screens/main.screen';
import {GoHome} from '../actions/navigate.action';
import {getOutgoingMonth} from '../actions/tab.action';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    if (this.props.auth.email) {
      this.props.getOutgoingMonth(this.props.auth.email);
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.navigate.router !== nextProps.navigate.router) {
      this.props.navigation.navigate(nextProps.navigate.router);
    }

    if (
      (this.props.auth.email !== '' || nextProps.auth.email !== '') &&
      this.props.auth.email !== nextProps.auth.email
    ) {
      const email = this.props.auth.email ?? nextProps.auth.email;
      this.props.getOutgoingMonth(email);
    }
  }

  render() {
    return <MainScreen />;
  }
}

export default connect(
  state => {
    return {
      navigate: state.navigateReducer,
      auth: state.authReducer,
    };
  },
  dispatch => {
    return {
      onGoHomeScreen: () => dispatch(GoHome()),
      getOutgoingMonth: email => dispatch(getOutgoingMonth(email)),
    };
  },
)(MainContainer);
