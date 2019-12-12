import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Item from './item.component';
import Icon from 'react-native-vector-icons/AntDesign';
export default class GroupItem extends Component {
  getTimeline() {
    if (this.props.timeline) {
      if (this.props.timeline.when) {
        return <Text>{this.props.timeline.when}</Text>;
      }

      if (this.props.timeline.from && this.props.timeline.to) {
        return (
          <>
            <Text>{this.props.timeline.from}</Text>
            <Icon name="arrowdown" size={14} color="green" />
            <Text>{this.props.timeline.to}</Text>
          </>
        );
      }
    }
  }

  getItems() {
    if (this.props.items) {
      return this.props.items.map((value, index) => {
        return (
          <View key={index}>
            <Item
              style={styles.item}
              icon={value.icon}
              note={value.note}
              amount={value.amount}
            />
          </View>
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

      if (Math.round(amount / 1000000) > 0) {
        return (
          <Text style={styles.text}>{Math.round(amount / 1000000)}Tr</Text>
        );
      }

      if (Math.round(amount / 1000) > 0) {
        return <Text style={styles.text}>{Math.round(amount / 1000)}K</Text>;
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeline}>{this.getTimeline()}</View>
        <View style={styles.items}>{this.getItems()}</View>
        <View style={styles.sum}>{this.getSum()}</View>
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
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
  },
  item: {
    borderColor: 'rgba(0,0,0,0.2)',
    padding: 2,
  },
  sum: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderLeftWidth: 0.5,
    textAlign: 'center',
    minWidth: 55,
  },
  text: {
    color: '#85bb65',
    fontSize: 17,
  },
});
