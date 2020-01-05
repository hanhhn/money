import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputScreen from '../screens/input.screen';
import {getInputOfYear} from '../actions/input.action';

class InputContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const email = this.props.auth.email;
    this.props.getInputOfYear(email, new Date().getFullYear());
  }

  render() {
    return (
      <InputScreen
        email={this.props.auth.email}
        goBack={this.props.screenProps.goBack}
        goIncomingScreen={this.props.screenProps.goIncomingScreen}
        getInputOfYear={this.props.getInputOfYear}
        dataSource={this.props.input}
      />
    );
  }
}

export default connect(
  state => {
    return {
      auth: state.authReducer,
      input: state.inputReducer,
    };
  },
  dispatch => {
    return {
      getInputOfYear: (email, year) => dispatch(getInputOfYear(email, year)),
    };
  },
)(InputContainer);
