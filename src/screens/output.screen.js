import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import GroupItem from '../components/group.component';

export default class OutputScreen extends Component {
  constructor(props) {
    super(props);
  }

  goOutgoingScreen(params) {
    this.props.screenProps.goOutgoingScreen(params);
  }

  render() {
    const outgoings = this.props.screenProps.outgoings[
      this.props.navigation.state.routeName
    ];

    const hasData = outgoings && outgoings.length > 0;

    return (
      <ScrollView style={styles.container}>
        {hasData && (
          <View>
            {outgoings.map((value, index) => {
              return (
                <GroupItem
                  key={index}
                  dataSource={value}
                  onItemClick={params => this.goOutgoingScreen(params)}
                />
              );
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
