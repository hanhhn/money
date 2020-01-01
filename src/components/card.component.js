import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Picker selectedValue="2019" style={styles.year}>
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2018" value="2018" />
          </Picker>
        </View>
        <View style={styles.money}>
          {/* <Icon name="dollar" size={23} color="#ffffff" /> */}
          <Text style={styles.text}>1.000.000 VND</Text>
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
    backgroundColor: '#0984e3',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  year: {
    minWidth: 105,
    color: '#ffffff',
  },
  money: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#ffffff',
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#2c3e50',
  },
});
