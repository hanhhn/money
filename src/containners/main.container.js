import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainScreen from '../screens/main.screen';
import {GoHome} from '../actions/navigate.action';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.navigate.router !== nextProps.navigate.router) {
      this.props.navigation.navigate(nextProps.navigate.router);
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
    };
  },
  dispatch => {
    return {
      onGoHomeScreen: () => dispatch(GoHome()),
    };
  },
)(MainContainer);
