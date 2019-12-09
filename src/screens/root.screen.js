import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AccountContainer from '../containners/account.container';
import InputScreen from './input.screen';
import OutputContainer from '../containners/output.container';
import ReportScreen from './report.screen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RootScreen extends Component {
  constructor(props) {
    super(props);
    const mainNavigator = createBottomTabNavigator(
      {
        InputScreen: {
          screen: InputScreen,
          navigationOptions: {
            tabBarLabel: 'Thu',
            tabBarIcon: ({tintColor}) => (
              <Icon name="smile-o" color={tintColor} size={27} />
            ),
          },
        },
        OutputScreen: {
          screen: OutputContainer,
          navigationOptions: {
            tabBarLabel: 'Chi',
            tabBarIcon: ({tintColor}) => (
              <Icon name="frown-o" color={tintColor} size={27} />
            ),
          },
        },
        ReportScreen: {
          screen: ReportScreen,
          navigationOptions: {
            tabBarLabel: 'Báo cáo',
            tabBarIcon: ({tintColor}) => (
              <Icon name="file-pdf-o" color={tintColor} size={27} />
            ),
          },
        },
        AccountScreen: {
          screen: AccountContainer,
          navigationOptions: {
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({tintColor}) => (
              <Icon name="user" color={tintColor} size={27} />
            ),
          },
        },
      },
      {
        initialRouteName: 'OutputScreen',
        lazy: true,
        tabBarOptions: {
          activeTintColor: '#ffaf40',
        },
      },
    );

    this.container = createAppContainer(mainNavigator);
  }

  UNSAFE_componentWillUpdate() {
    console.log(this.props.screenProps);
    if (this.props.screenProps.incoming.show) {
      this.props.navigation.navigate('IncomingScreen');
    }
  }

  render() {
    const RootRouter = this.container;
    return <RootRouter />;
  }
}
