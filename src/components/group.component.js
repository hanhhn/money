import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Item from './item.component';
import Icon from 'react-native-vector-icons/AntDesign';
import {kConverter} from '../cores/helpers/utils.helper';

export default class GroupItem extends Component {
  getTimeline() {
    if (this.props.from && this.props.from === this.props.to) {
      return <Text>{this.props.from}</Text>;
    }

    if (this.props.from && this.props.to) {
      return (
        <>
          <Text>{this.props.from}</Text>
          <Icon name="arrowdown" size={14} color="green" />
          <Text>{this.props.to}</Text>
        </>
      );
    }
  }

  getItems() {
    if (this.props.items) {
      return this.props.items.map((value, index) => {
        return (
          <Item
            key={index}
            icon={value.icon}
            note={value.note}
            amount={value.amount}
          />
        );
      });
    }
  }

  getSum() {
    if (this.props.items) {
      let amount = 0;
      this.props.items.forEach(value => {
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
