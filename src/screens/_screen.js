import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RootScreen from './root.screen';
import IncomingScreen from './incoming.screen';

export default class DefaultScreen extends Component {
  constructor(props) {
    super(props);
    const mainNavigator = createStackNavigator(
      {
        RootScreen: {
          screen: RootScreen,
        },
        IncomingScreen: {
          screen: IncomingScreen,
        },
      },
      {
        initialRouteName: 'RootScreen',
        lazy: true,
        headerMode: 'none',
        tabBarOptions: {
          activeTintColor: '#ffaf40',
        },
      },
    );

    this.container = createAppContainer(mainNavigator);
  }

  render() {
    const DefaultRouter = this.container;
    return <DefaultRouter />;
  }
}
