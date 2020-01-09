import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Item from './item.component';
import Icon from 'react-native-vector-icons/AntDesign';
import {kConverter} from '../cores/helpers/utils.helper';

export default class GroupItem extends Component {
  getTimeline() {
    const item = this.props.dataSource[0];
    if (item.from && item.from === item.to) {
      return <Text>{item.from}</Text>;
    }

    if (item.from && item.to) {
      return (
        <>
          <Text>{item.from}</Text>
          <Icon name="arrowdown" size={14} color="green" />
          <Text>{item.to}</Text>
        </>
      );
    }
  }

  getItems() {
    if (this.props.dataSource) {
      return this.props.dataSource.map((value, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => this.props.onItemClick({ref: value.ref})}>
            <Item icon={value.icon} note={value.note} amount={value.amount} />
          </TouchableOpacity>
        );
      });
    }
  }

  getSum() {
    if (this.props.dataSource) {
      let amount = 0;
      this.props.dataSource.forEach(value => {
        amount += value.amount;
      });
      return amount;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeline}>{this.getTimeline()}</View>
        <View style={styles.items}>
          <View style={styles.item}>{this.getItems()}</View>
        </View>
        <View style={styles.sum}>
          <Text numberOfLines={1} style={styles.text}>
            {kConverter(this.getSum())}
          </Text>
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
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 0.5,
  },
  timeline: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRightWidth: 0.5,
    minWidth: 20,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    flex: 1,
  },
  sum: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderLeftWidth: 0.5,
    textAlign: 'center',
  },
  text: {
    color: '#85bb65',
    textAlign: 'center',
    fontSize: 17,
    width: 95,
  },
});
