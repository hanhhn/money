import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/header.component';
import {GoOutgoing} from '../actions/navigate.action';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerProps = {
      onShowOutgoingScreen: this.props.onShowOutgoingScreen,
      amount: this.props.header.outgoing,
    };

    return <Header {...headerProps} />;
  }
}

export default connect(
  state => {
    return {
      header: state.headerReducer,
    };
  },
  dispatch => {
    return {
      onShowOutgoingScreen: () => dispatch(GoOutgoing()),
    };
  },
)(HeaderContainer);
