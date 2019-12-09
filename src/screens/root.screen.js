import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../screens/main.screen';
import IncomingScreen from '../screens/incoming.screen';

export default class RootScreen extends Component {
  constructor(props) {
    super(props);
    const rootNavigator = createStackNavigator(
      {
        MainScreen: {
          screen: MainScreen,
        },
        IncomingScreen: {
          screen: IncomingScreen,
        },
      },
      {
        initialRouteName: 'MainScreen',
        lazy: true,
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
    return <RootNavigator screenProps={this.props} />;
  }
}
