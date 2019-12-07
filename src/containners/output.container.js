import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {SignOut} from '../actions/auth.action';

import OutputScreen from '../screens/output.screen';
import HeaderContainer from '../containners/header.container';

class OutputContainer extends Component {
  container = {};

  constructor(props) {
    super(props);

    const outputNavigator = createMaterialTopTabNavigator(
      {
        Tab1: {
          screen: OutputScreen,
          navigationOptions: {
            title: 'Tháng Này',
          },
        },
      },
      {
        initialRouteName: 'Tab1',
        lazy: true,
        tabBarOptions: {
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            width: 100,
          },
          scrollEnabled: true,
        },
      },
    );

    this.container = createAppContainer(outputNavigator);
  }

  render() {
    const ContentContainer = this.container;

    return (
      <>
        <HeaderContainer />
        <ContentContainer />
      </>
    );
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
      onSignOut: () => dispatch(SignOut()),
    };
  },
)(OutputContainer);
