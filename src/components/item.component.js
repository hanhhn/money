import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Text>Icon</Text>
        </View>
        <View style={styles.description}>
          <Text>Hi Item</Text>
        </View>
        <View style={styles.money}>
          <Text>150k</Text>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  description: {
    flex: 1,
  },
  money: {
    marginLeft: 5,
    marginRight: 5,
  },
});
