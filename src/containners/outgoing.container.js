import React, {Component} from 'react';
import {connect} from 'react-redux';
import OutgoingScreen from '../screens/outgoing.screen';
import {GoHome} from '../actions/navigate.action';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <OutgoingScreen {...this.props} />;
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
