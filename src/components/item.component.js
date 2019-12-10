import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon name="plus-circle" size={14} color="red" />
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>Chi tiêu bla bla bla</Text>
        </View>
        <View style={styles.money}>
          <Text style={styles.text}>150k</Text>
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
    paddingTop: 4,
    paddingBottom: 4,
  },
  icon: {
    marginLeft: 2,
    marginRight: 5,
  },
  description: {
    flex: 1,
  },
  text: {
    flexWrap: 'wrap',
  },
  money: {
    marginLeft: 5,
    marginRight: 5,
  },
});
