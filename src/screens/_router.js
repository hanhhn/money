import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import AccountContainer from '../containners/account.container';
import InputScreen from './input.screen';
import OutputScreen from './output.screen';
import ReportScreen from './report.screen';

const mainNavigator = createBottomTabNavigator({
  OutputScreen: {
    tabBarLabel: 'Details',
    title: 'Chi',
    screen: OutputScreen,
  },
  InputScreen: {
    title: 'Thu',
    screen: InputScreen,
  },
  ReportScreen: {
    title: 'Báo Cáo',
    screen: ReportScreen,
  },
  AccountScreen: {
    title: 'Tài Khoản',
    screen: AccountContainer,
  },
});

export default createAppContainer(mainNavigator);
