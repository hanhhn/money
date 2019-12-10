import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputScreen from '../screens/input.screen';
import {GoIncoming} from '../actions/navigate.action';

class InputContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <InputScreen {...this.props} />;
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
      onShowIncomingScreen: () => dispatch(GoIncoming()),
    };
  },
)(InputContainer);
