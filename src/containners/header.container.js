import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/header.component';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerProps = {
      amount: this.props.header.output,
      ...this.props,
    };

    return <Header {...headerProps} />;
  }
}

export default connect(state => {
  return {
    header: state.headerReducer,
  };
})(HeaderContainer);
