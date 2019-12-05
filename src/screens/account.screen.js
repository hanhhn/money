import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class AccountScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Sign out" onPress={() => this.props.onSignOut()} />
      </View>
    );
  }
}
