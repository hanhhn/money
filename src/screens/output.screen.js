import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Group from '../components/group.component';

export default class OutputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outgoings: [],
    };
  }

  render() {
    const {outgoings} = this.state;
    const hasData = outgoings && outgoings.length > 0;

    return (
      <ScrollView style={styles.container}>
        {hasData && (
          <View>
            {outgoings.map((value, index) => {
              return <Group key={index} {...value} />;
            })}
          </View>
        )}
        {!hasData && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text>KHÔNG CÓ DỮ LIỆU</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
});
