import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Group from '../components/group.component';

export default class OutputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incoming: [
        {
          timeline: {
            from: 2,
            to: 5,
          },
          items: [
            {
              icon: 'plus',
              note: 'Test 123 ',
              amount: 123123,
            },
            {
              icon: 'plus',
              note: 'Test 123234 ',
              amount: 431,
            },
            {
              icon: 'plus',
              note: 'Test 123234 ',
              amount: 431,
            },
          ],
        },
        {
          timeline: {
            when: 1,
          },
          items: [
            {
              icon: 'plus',
              note: 'Test 123 ',
              amount: 123122343,
            },
            {
              icon: 'plus',
              note: 'Test 123234 ',
              amount: 431,
            },
            {
              icon: 'plus',
              note: 'Test 123234 ',
              amount: 431,
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {this.state.incoming &&
            this.state.incoming.map((value, index) => {
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
