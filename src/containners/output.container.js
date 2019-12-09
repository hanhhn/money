import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
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
            color: '#ffffff',
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#ffaf40',
          },
          tabStyle: {
            // height: 40,
            alignContent: 'center',
            alignItems: 'center',
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

export default connect()(OutputContainer);
