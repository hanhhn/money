import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Group from '../components/group.component';
import {queryOutgoingItems} from '../cores/services/query.service';
import {_getStoreData} from '../cores/services/storage.service';
import {EMAIL} from '../constants';

export default class OutputScreen extends Component {
  now = new Date();

  constructor(props) {
    super(props);

    this.state = {
      outgoings: [],
    };
  }

  UNSAFE_componentWillMount() {
    _getStoreData(EMAIL).then(email => {
      if (email) {
        const year = this.now.getFullYear();
        const month = this.now.getMonth() + 1;
        queryOutgoingItems(email, year.toString(), month.toString()).then(
          data => {
            this.setState({
              outgoings: data,
            });
          },
        );
      }
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
