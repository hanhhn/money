import React, {Component} from 'react';
import {
  Text,
  View,
  Picker,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GroupItem from '../components/group.component';
import {currencyConverter} from '../cores/helpers/utils.helper';

export default class InputScreen extends Component {
  now = new Date();

  constructor(props) {
    super(props);

    this.state = {
      year: this.now.getFullYear(),
      amount: 0,
    };
  }

  goIncomingScreen(params) {
    this.props.goIncomingScreen(params);
  }

  onYearChange(itemValue, itemIndex) {
    this.props.getInputOfYear(this.props.email, +itemValue);

    this.setState({
      year: itemValue,
    });
  }

  render() {
    const incoming = this.props.dataSource[this.state.year];
    const hasData = incoming && incoming.length > 0;
    const amount = this.props.dataSource.amount;

    return (
      <View style={styles.container}>
        <ScrollView style={{paddingLeft: 2, paddingRight: 2, paddingTop: 2}}>
          <View style={styles.content}>
            <View style={{marginBottom: 2}}>
              <View style={styles.card}>
                <View>
                  <Picker
                    style={styles.year}
                    selectedValue={this.state.year}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onYearChange(itemValue, itemIndex)
                    }>
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2025" value="2025" />
                  </Picker>
                </View>
                <View style={styles.money}>
                  {/* <Icon name="dollar" size={23} color="#ffffff" /> */}
                  <Text style={styles.text}>{currencyConverter(amount)}</Text>
                </View>
              </View>
            </View>
            <View style={{padding: 1}}>
              {hasData &&
                incoming.map((value, index) => {
                  return (
                    <GroupItem
                      key={index}
                      dataSource={value}
                      onItemClick={params => this.goIncomingScreen(params)}
                    />
                  );
                })}
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
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.plusCircle}
            onPress={() => this.goIncomingScreen()}>
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
  card: {
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
