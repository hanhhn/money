import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../cores/helpers/utils.helper.js';
import Group from '../components/group.component';

export default class OutputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outgoings: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const email = this.props.screenProps.email;
    const year = +this.props.navigation.state.routeName.substr(0, 4);
    const month = +this.props.navigation.state.routeName.substr(4, 2);
    if (email && email !== '' && year && month) {
      firestore()
        .collection('outgoings')
        .doc(email)
        .collection('items')
        .where('year', '==', year)
        .where('month', '==', month)
        .orderBy('from', 'desc')
        .orderBy('to', 'asc')
        .orderBy('createdDate', 'asc')
        .get()
        .then(querySnapShot => {
          let result = [];
          querySnapShot.forEach(docSnapshot => {
            result.push({
              ref: docSnapshot.ref.path,
              ...docSnapshot.data(),
            });
          });

          const data = groupBy(result, item => {
            return [item.from, item.to];
          });

          // update header
          const {getSumMonthOutput} = this.props.screenProps;
          getSumMonthOutput(data);

          this.setState({
            outgoings: data,
          });
        });
    }
  }

  render() {
    const {outgoings} = this.state;
    const hasData = outgoings && outgoings.length > 0;

    return (
      <ScrollView style={styles.container}>
        {hasData && (
          <View>
            {outgoings.map((value, index) => {
              return <Group key={index} dataSource={value} />;
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
