import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Sum extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>300k</Text>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 55,
  },
  text: {
    color: '#85bb65',
    fontSize: 17,
  },
});
