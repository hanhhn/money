import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IncomingContainer from './incoming.container';
import OutgoingContainer from './outgoing.container';
import MainContainer from './main.container';

class RootContainer extends Component {
  render() {
    const rootNavigator = createStackNavigator(
      {
        MainScreen: {
          screen: MainContainer,
        },
        IncomingScreen: {
          screen: IncomingContainer,
        },
        OutgoingScreen: {
          screen: OutgoingContainer,
        },
      },
      {
        initialRouteName: 'MainScreen',
        lazy: false,
        headerMode: 'none',
        tabBarOptions: {
          activeTintColor: '#ffaf40',
        },
      },
    );

    const RootNavigator = createAppContainer(rootNavigator);
    return <RootNavigator />;
  }
}

export default connect()(RootContainer);
