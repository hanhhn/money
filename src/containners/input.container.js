import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputScreen from '../screens/input.screen';
import {ShowOutgoing} from '../actions/outgoing.action';

class InputContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = {
      outgoing: this.props.outgoing,
      onShowOutgoing: this.props.onShowOutgoing,
    };

    return <InputScreen {...props} />;
  }
}

export default connect(
  state => {
    return {
      outgoing: state.outgoingReducer,
    };
  },
  dispatch => {
    return {
      onShowOutgoing: () => dispatch(ShowOutgoing()),
    };
  },
)(InputContainer);
