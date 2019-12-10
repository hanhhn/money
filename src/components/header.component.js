import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.notify}>
          <Icon name="dollar" size={25} color="#85bb65" />
        </View>
        <View style={styles.money}>
          <Text style={styles.vnd}>1.000.000 đ</Text>
        </View>
        <View style={styles.plus}>
          <TouchableOpacity onPress={() => this.props.onShowOutgoingScreen()}>
            <Icon name="plus-circle" size={40} color="#ecf0f1" />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffaf40',
    paddingTop: 3,
  },
  notify: {
    marginLeft: 10,
    marginRight: 10,
  },
  money: {
    flex: 1,
  },
  vnd: {
    fontSize: 20,
    color: '#85bb65',
    fontWeight: 'bold',
  },
  plus: {
    marginLeft: 10,
    marginRight: 10,
  },
});
