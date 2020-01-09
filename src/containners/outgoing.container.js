import React, {Component} from 'react';
import {connect} from 'react-redux';
import OutgoingScreen from '../screens/outgoing.screen';
import {getOutputOfMonth} from '../actions/output.action';

class OutgoingContainer extends Component {
  constructor(props) {
    super(props);
  }

  goBack(navigation) {
    navigation.goBack();
  }

  getOutputOfMonth(year, month) {
    const email = this.props.auth.email;
    this.props.getOutputOfMonth(email, year, month);
  }

  render() {
    const ref = this.props.navigation.getParam('ref');
    const props = {
      id: ref,
      email: this.props.auth.email,
      goBack: () => this.goBack(this.props.navigation),
      getOutputOfMonth: (year, month) => this.getOutputOfMonth(year, month),
    };

    return <OutgoingScreen {...props} />;
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
      getOutputOfMonth: (email, year, month) =>
        dispatch(getOutputOfMonth(email, year, month)),
    };
  },
)(OutgoingContainer);
