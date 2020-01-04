import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import OutputScreen from '../screens/output.screen';
import HeaderContainer from './header.container.js';

class OutputContainer extends Component {
  now = new Date();

  constructor(props) {
    super(props);
  }

  tabs(tabs) {
    return tabs.reduce((routes, tab) => {
      const thisMonth =
        +tab.year === this.now.getFullYear() &&
        +tab.month === this.now.getMonth() + 1;

      routes[tab.id] = {
        screen: OutputScreen,
        navigationOptions: {
          title: thisMonth ? 'Tháng Này' : tab.title,
        },
      };

      return routes;
    }, {});
  }

  getOutputNavigator() {
    let {tabs} = this.props;

    let orderTabs = ['tabNew'];
    let renderTabs = [];

    if (tabs && tabs.length > 0) {
      renderTabs = this.tabs(tabs);
      orderTabs = tabs.map(tab => {
        return tab.id;
      });
    } else {
      renderTabs = {
        tabNew: {
          screen: OutputScreen,
          navigationOptions: {
            title: 'Tháng Này',
          },
        },
      };
    }

    const outputNavigator = createMaterialTopTabNavigator(renderTabs, {
      lazy: true,
      order: orderTabs,
      tabBarOptions: {
        labelStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: '#0984e3',
        },
        tabStyle: {
          // height: 40,
          alignContent: 'center',
          alignItems: 'center',
        },
        scrollEnabled: true,
      },
      defaultNavigationOptions: ({navigation}) => ({
        tabBarOnPress: ({navigation, defaultHandler}) => {
          defaultHandler();
        },
      }),
    });

    return createAppContainer(outputNavigator);
  }

  render() {
    const OutputNavigator = this.getOutputNavigator();

    return (
      <>
        <HeaderContainer
          goBack={this.props.screenProps.goBack}
          goOutgoingScreen={this.props.screenProps.goOutgoingScreen}
        />
        <OutputNavigator />
      </>
    );
  }
}

export default connect()(OutputContainer);
