import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AccountContainer from '../containners/account.container';
import InputScreen from './input.screen';
import OutputContainer from '../containners/output.container';
import ReportScreen from './report.screen';

const mainNavigator = createBottomTabNavigator(
  {
    InputScreen: {
      screen: InputScreen,
      navigationOptions: {
        tabBarLabel: 'Thu',
      },
    },
    OutputScreen: {
      screen: OutputContainer,
      navigationOptions: {
        tabBarLabel: 'Chi',
      },
    },
    ReportScreen: {
      screen: ReportScreen,
      navigationOptions: {
        tabBarLabel: 'Báo cáo',
      },
    },
    AccountScreen: {
      screen: AccountContainer,
      navigationOptions: {
        tabBarLabel: 'Tài khoản',
      },
    },
  },
  {
    initialRouteName: 'OutputScreen',
    lazy: true,
  },
);

export default createAppContainer(mainNavigator);
