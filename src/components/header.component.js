import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity>
            <Text>Icon</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Plus</Text>
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
  },
});
