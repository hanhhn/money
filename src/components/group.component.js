import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Item from './item.component';
import SumItem from './sum.component';

export default class GroupItem extends Component {
  render() {
    const items = [
      {
        icon: 'icon',
        category: 'ăn chơi',
        description: 'Đi quẩy ở quận 3',
        date: '20/11/2021',
        money: 1000,
      },
      {
        icon: 'icon',
        category: 'ăn chơi',
        description: 'Đi quẩy ở quận 3',
        date: '20/11/2021',
        money: 1000,
      },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.items}>
          <View style={styles.item}>
            <Item />
          </View>
          <View style={styles.item}>
            <Item />
          </View>
          <View style={styles.item}>
            <Item />
          </View>
          <View style={styles.item}>
            <Item />
          </View>
        </View>
        <View style={styles.sum}>
          <SumItem />
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
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  items: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
  },
  item: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.5,
    padding: 2,
  },
  sum: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderLeftWidth: 0.5,
    padding: 10,
  },
});
