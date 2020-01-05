import React, {Component} from 'react';
import {connect} from 'react-redux';
import IncomingScreen from '../screens/incoming.screen';
import {getInputOfYear} from '../actions/input.action';

class IncomingContainer extends Component {
  constructor(props) {
    super(props);
  }

  goBack(navigation) {
    navigation.goBack();
  }

  render() {
    const props = {
      email: this.props.auth.email,
      goBack: () => this.goBack(this.props.navigation),
      getInputOfYear: this.props.getInputOfYear,
    };

    return <IncomingScreen {...props} />;
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
      getInputOfYear: (email, year) => dispatch(getInputOfYear(email, year)),
    };
  },
)(IncomingContainer);
