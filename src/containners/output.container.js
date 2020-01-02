import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import OutputScreen from '../screens/output.screen';
import {OutgoingOfMonth} from '../actions/header.action';
import HeaderContainer from './header.container.js';

class OutputContainer extends Component {
  now = new Date();

  constructor(props) {
    super(props);
  }

  tabs(tabs) {
    return tabs.reverse().reduce((routes, tab) => {
      routes[tab.id] = {
        screen: OutputScreen,
        navigationOptions: {
          title: +tab.year === this.now.getFullYear() ? 'Tháng Này' : tab.title,
        },
      };

      return routes;
    }, {});
  }

  render() {
    let outputNavigator = {};
    if (this.props.tabs.outgoing && this.props.tabs.outgoing.length > 0) {
      const tabs = this.tabs(this.props.tabs.outgoing);
      const orderTabs = this.props.tabs.outgoing
        .map(tab => {
          return tab.id;
        })
        .sort()
        .reverse();

      outputNavigator = createMaterialTopTabNavigator(tabs, {
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
    } else {
      outputNavigator = createMaterialTopTabNavigator(
        {
          Tab1: {
            screen: OutputScreen,
            navigationOptions: {
              title: 'Tháng Này',
            },
          },
        },
        {
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
        },
      );
    }

    const ContentContainer = createAppContainer(outputNavigator);
    const contentProps = {
      email: this.props.auth.email,
      onGetOutgoingOfMonth: this.props.onGetOutgoingOfMonth,
    };

    return (
      <>
        <HeaderContainer />
        <ContentContainer screenProps={contentProps} />
      </>
    );
  }
}

export default connect(
  state => {
    return {
      tabs: state.tabsReducer,
      auth: state.authReducer,
    };
  },
  dispatch => {
    return {
      onGetOutgoingOfMonth: outs => dispatch(OutgoingOfMonth(outs)),
    };
  },
)(OutputContainer);
