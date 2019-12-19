import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Group from '../components/group.component';
import {queryOutgoingItems} from '../cores/services/query.service';

export default class OutputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outgoings: [],
    };
  }

  UNSAFE_componentWillMount() {
    queryOutgoingItems('hngochanh@outlook.com', '2019', '12').then(data => {
      this.setState({
        outgoings: data,
      });
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
