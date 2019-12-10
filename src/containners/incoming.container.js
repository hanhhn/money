import React, {Component} from 'react';
import {connect} from 'react-redux';
import IncomingScreen from '../screens/incoming.screen';
import {GoHome} from '../actions/navigate.action';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <IncomingScreen {...this.props} />;
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
