import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <Icon name="rocket" size={30} color="#900" />
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
