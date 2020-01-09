import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AccountContainer from '../containners/account.container';
import InputContainer from '../containners/input.container';
import OutputContainer from '../containners/output.container';
import ReportScreen from '../screens/report.screen';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  goBack(navigation) {
    navigation.goBack();
  }

  goOutgoingScreen(navigation, params) {
    if (params) {
      navigation.navigate('OutgoingScreen', params);
    } else {
      navigation.navigate('OutgoingScreen');
    }
  }

  goIncomingScreen(navigation, params) {
    if (params) {
      navigation.navigate('IncomingScreen', params);
    } else {
      navigation.navigate('IncomingScreen');
    }
  }

  render() {
    const mainNavigator = createBottomTabNavigator(
      {
        InputScreen: {
          screen: InputContainer,
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
              <Icon name="pie-chart" color={tintColor} size={27} />
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
        lazy: false,
        tabBarOptions: {
          activeTintColor: '#ffaf40',
        },
      },
    );

    const MainNavigator = createAppContainer(mainNavigator);

    const props = {
      goOutgoingScreen: params =>
        this.goOutgoingScreen(this.props.navigation, params),
      goIncomingScreen: params =>
        this.goIncomingScreen(this.props.navigation, params),
    };

    return <MainNavigator screenProps={props} />;
  }
}

export default connect()(MainContainer);
