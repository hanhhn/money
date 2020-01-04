import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputScreen from '../screens/input.screen';

class InputContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputScreen
        goBack={this.props.screenProps.goBack}
        goIncomingScreen={this.props.screenProps.goIncomingScreen}
      />
    );
  }
}

export default connect()(InputContainer);
