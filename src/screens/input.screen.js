import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Group from '../components/group.component';
import Card from '../components/card.component';

export default class InputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incoming: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingLeft: 2, paddingRight: 2, paddingTop: 2}}>
          <View style={styles.content}>
            <View style={{marginBottom: 5}}>
              <Card />
            </View>
            <View style={{padding: 1}}>
              {this.state.incoming &&
                this.state.incoming.map((value, index) => {
                  return <Group key={index} {...value} />;
                })}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.plusCircle}
            onPress={() => this.props.goIncomingScreen()}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0984e3',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  plus: {
    color: '#ffffff',
    fontSize: 30,
    top: -1,
  },
});
