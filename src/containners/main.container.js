import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainScreen from '../screens/main.screen';
import {InitNavigation} from '../actions/navigate.action';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <MainScreen />;
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
      onInitNavigation: navigation => dispatch(InitNavigation(navigation)),
    };
  },
)(MainContainer);
