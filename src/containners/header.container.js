import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/header.component';

class HeaderContainer extends Component {
  render() {
    return <Header />;
  }
}

export default connect()(HeaderContainer);
