import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Group from '../components/group.component';
import {queryOutgoingItems} from '../cores/services/query.service';

export default class OutputScreen extends Component {
  now = new Date();

  constructor(props) {
    super(props);

    this.state = {
      outgoings: [],
    };

    this._isMounted = false;
  }

  UNSAFE_componentWillMount() {
    const email = this.props.screenProps.email;
    if (email && email !== '') {
      this._isMounted = true;
      const year = +this.props.navigation.state.routeName.substr(0, 4);
      const month = +this.props.navigation.state.routeName.substr(4, 2);
      this._isMounted && this.getData(email, year, month).done();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getData(email, year, month) {
    const data = await queryOutgoingItems(email, year, month);

    this._isMounted &&
      this.setState({
        outgoings: data,
      });

    this._isMounted && this.props.screenProps.onGetOutgoingOfMonth(data);
  }

  render() {
    const {outgoings} = this.state;

    return (
      <ScrollView style={styles.container}>
        {outgoings && (
          <View>
            {outgoings.map((value, index) => {
              return <Group key={index} {...value} />;
            })}
          </View>
        )}
        {!outgoings && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text>KHÔNG CÓ DỮ LIỆU</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
});
