import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import AccountScreen from './screens/account.screen';
import InputScreen from './screens/input.screen';
import OutputScreen from './screens/output.screen';
import ReportScreen from './screens/report.screen';

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
    screen: AccountScreen,
  },
});

export default createAppContainer(mainNavigator);
