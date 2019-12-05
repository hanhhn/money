import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class SignInScreen extends Component {
  render() {
    const {onSignIn} = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textCenter}>Vietnam</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>My Money</Text>
            <Text>Balance your incomings and outgoings</Text>
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity
              style={styles.facebook}
              onPress={() => onSignIn('facebook')}>
              <Text style={styles.f}>F</Text>
              <Text style={styles.text}>Sign in with Facebook</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.or}>Or</Text>
            </View>
            <TouchableOpacity
              style={styles.google}
              onPress={() => onSignIn('google')}>
              <Text style={styles.g}>G</Text>
              <Text style={styles.text}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.textCenter}>Share with those that need it</Text>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    padding: 15,
  },
  formGroup: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebook: {
    alignItems: 'center',
    backgroundColor: '#3B5998',
    padding: 15,
    margin: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 300,
  },
  or: {
    textAlign: 'center',
  },
  google: {
    alignItems: 'center',
    backgroundColor: '#DD4B39',
    padding: 15,
    margin: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 300,
  },
  text: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
  },
  textCenter: {
    textAlign: 'center',
    color: '#cccccc',
    margin: 5,
    padding: 3,
  },
  f: {
    marginRight: 15,
    marginLeft: 15,
    color: '#ffffff',
  },
  g: {
    marginRight: 15,
    marginLeft: 15,
    color: '#ffffff',
  },
});
