import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import OutputScreen from '../screens/output.screen';
import HeaderContainer from './header.container.js';
import {getOutputOfMonth} from '../actions/output.action';

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

  loadTabs() {
    const email = this.props.auth.email;
    if (email && email !== '') {
      firestore()
        .collection('settings')
        .where('key', '==', 'month')
        .orderBy('year', 'desc')
        .orderBy('month', 'desc')
        .get()
        .then(querySnapShot => {
          let result = [];
          querySnapShot.forEach(docSnapShot => {
            const data = docSnapShot.data();
            const year = data.year.toString();
            const month = data.month.toString().padStart(2, 0);

            if (
              this.now.getFullYear() >= data.year &&
              this.now.getMonth() + 1 >= data.month
            ) {
              result.push({
                id: year + month,
                year: data.year,
                month: data.month,
                title: year + '/' + month,
              });
            }
          });

          if (result && result.length > 0) {
            const f = result[0];
            if (f && f.year && f.month) {
              this.props.getOutputOfMonth(email, f.year, f.month);
            }

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
      lazy: false,
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
          const email = this.props.screenProps.email;
          const year = +this.props.navigation.state.routeName.substr(0, 4);
          const month = +this.props.navigation.state.routeName.substr(4, 2);
          if (email && email !== '' && year && month) {
            this.props.getOutputOfMonth(email, year, month);
          }

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
      outgoings: this.props.output,
      goOutgoingScreen: this.props.screenProps.goOutgoingScreen,
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
      output: state.outputReducer,
    };
  },
  dispatch => {
    return {
      getOutputOfMonth: (email, year, month) =>
        dispatch(getOutputOfMonth(email, year, month)),
    };
  },
)(OutputContainer);
