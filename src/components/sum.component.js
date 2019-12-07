import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Sum extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>20/11</Text>
        <Text>10.000.000 đ</Text>
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
  },
});
