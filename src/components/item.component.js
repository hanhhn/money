import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Item extends Component {
  getAmount(amount) {
    if (Math.round(amount / 1000000) > 0) {
      return <Text style={styles.text}>{Math.round(amount / 1000000)}Tr</Text>;
    }

    if (Math.round(amount / 1000) > 0) {
      return <Text style={styles.text}>{Math.round(amount / 1000)}K</Text>;
    }

    return <Text style={styles.text}>{amount}Đ</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          {this.props.icon && (
            <Icon name={this.props.icon} size={14} color="red" />
          )}
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>{this.props.note}</Text>
        </View>
        <View style={styles.money}>{this.getAmount(this.props.amount)}</View>
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
