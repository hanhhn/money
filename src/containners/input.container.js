import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputScreen from '../screens/input.screen';

class InputContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <InputScreen />;
  }
}

export default connect()(InputContainer);
