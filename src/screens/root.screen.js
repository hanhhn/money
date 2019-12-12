import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainContainer from '../containners/main.container';
import IncomingContainer from '../containners/incoming.container';
import OutgoingContainer from '../containners/outgoing.container';

export default class RootScreen extends Component {
  constructor(props) {
    super(props);
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

    this.rootNavigator = createAppContainer(rootNavigator);
  }

  render() {
    const RootNavigator = this.rootNavigator;
    return <RootNavigator />;
  }
}
