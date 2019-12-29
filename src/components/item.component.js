import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {kConverter} from '../cores/helpers/utils.helper';

export default class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.icon}>
          {this.props.icon && (
            <Icon name={this.props.icon} size={14} color="red" />
          )}
        </View> */}
        <View style={styles.description}>
          <Text numberOfLines={1} style={styles.text}>
            {this.props.note}
          </Text>
        </View>
        <View style={styles.money}>
          <Text style={styles.text}>{kConverter(this.props.amount)}</Text>
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
    marginLeft: 3,
  },
  text: {
    flexWrap: 'wrap',
  },
  money: {
    marginLeft: 5,
    marginRight: 5,
  },
});
