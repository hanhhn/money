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
  }

  UNSAFE_componentWillMount() {
    const email = this.props.screenProps.email;
    if (email && email !== '') {
      const year = +this.props.navigation.state.routeName.substr(0, 4);
      const month = +this.props.navigation.state.routeName.substr(4, 2);
      this.getData(email, year, month).done();
    }
  }

  async getData(email, year, month) {
    const data = await queryOutgoingItems(email, year, month);
    this.setState({
      outgoings: data,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {this.state.outgoings &&
            this.state.outgoings.map((value, index) => {
              return <Group key={index} {...value} />;
            })}
        </View>
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
