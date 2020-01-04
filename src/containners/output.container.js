import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import OutputScreen from '../screens/output.screen';
import HeaderContainer from './header.container.js';
import {getSumMonthOutput} from '../actions/header.action';

class OutputContainer extends Component {
  now = new Date();

  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
    };
  }

  componentDidMount() {
    this.loadTabs();
  }

  async loadTabs() {
    const email = this.props.auth.email;
    if (email && email !== '') {
      firestore()
        .collection('outgoings')
        .doc(email)
        .get()
        .then(querySnapShot => {
          const data = querySnapShot.data();
          if (data && data.months) {
            const months = data.months;

            const result =
              months.length > 0 &&
              months.map(v => {
                const year = v.substr(0, 4);
                const month = v.substr(4, 2);
                return {
                  id: v,
                  year: +year,
                  month: +month,
                  title: year + '/' + month,
                };
              });

            this.setState({
              tabs: result,
            });
          }
        });
    }
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

  getOutputNavigator(tabs) {
    let orderTabs = ['tabNews'];
    let renderTabs = [];

    if (tabs && tabs.length > 0) {
      renderTabs = this.tabs(tabs);
      orderTabs = tabs.map(tab => {
        return tab.id;
      });
    } else {
      renderTabs = {
        tabNews: {
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
    const OutputNavigator = this.getOutputNavigator(this.state.tabs);
    const navProps = {
      email: this.props.auth.email,
      getSumMonthOutput: this.props.getSumMonthOutput,
    };

    return (
      <>
        <HeaderContainer
          goBack={this.props.screenProps.goBack}
          goOutgoingScreen={this.props.screenProps.goOutgoingScreen}
        />
        <OutputNavigator screenProps={navProps} />
      </>
    );
  }
}

export default connect(
  state => {
    return {
      auth: state.authReducer,
    };
  },
  dispatch => {
    return {
      getSumMonthOutput: outs => dispatch(getSumMonthOutput(outs)),
    };
  },
)(OutputContainer);
