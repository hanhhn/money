import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainContainer from '../containners/main.container';
import IncomingScreen from '../screens/incoming.screen';
import OutgoingScreen from '../screens/outgoing.screen';

export default class RootScreen extends Component {
  constructor(props) {
    super(props);
    const rootNavigator = createStackNavigator(
      {
        MainScreen: {
          screen: MainContainer,
        },
        IncomingScreen: {
          screen: IncomingScreen,
        },
        OutgoingScreen: {
          screen: OutgoingScreen,
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
    // this.props.onInitNavigation(this.rootRef.current.navigation);
    return <RootNavigator />;
  }
}
