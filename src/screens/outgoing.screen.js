import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker,
  Platform,
  Button,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as AntIcon} from 'react-native-vector-icons/AntDesign';
import {getCategory, dateConverter} from '../cores/helpers/utils.helper';

export default class OutgoingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duringDay: true,
      categories: [],
      category: '',
      fromDate: new Date(),
      toDate: new Date(),
      showFromDate: false,
      showToDate: false,
      date: new Date('2020-06-12T14:42:42'),
      mode: 'date',
      show: false,
    };

    this.onDuringDaySwitch = this.onDuringDaySwitch.bind(this);
    this.onFromDatePress = this.onFromDatePress.bind(this);
    this.onToDatePress = this.onToDatePress.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      ...this.state,
      categories: getCategory(),
    });
  }

  onDuringDaySwitch() {
    this.setState({
      ...this.state,
      duringDay: !this.state.duringDay,
    });
  }

  onNoteChange(value) {
    console.log(value);
  }

  onAmountChange(value) {
    console.log(value);
  }

  onCategoryChange(itemValue, itemIndex) {
    this.setState({
      ...this.state,
      category: itemValue,
    });
  }

  onFromDatePress() {
    this.setState({
      ...this.state,
      showFromDate: true,
    });
  }

  onFromDateChange(event, date) {
    date = date || this.state.fromDate;

    this.setState({
      ...this.state,
      showFromDate: Platform.OS === 'ios' ? true : false,
      fromDate: date,
    });
  }

  onToDatePress() {
    this.setState({
      ...this.state,
      showToDate: true,
    });
  }

  onToDateChange(event, date) {
    date = date || this.state.toDate;

    this.setState({
      ...this.state,
      showToDate: Platform.OS === 'ios' ? true : false,
      toDate: date,
    });
  }

  render() {
    const {onGoHomeScreen} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={() => onGoHomeScreen()}>
              <AntIcon name="arrowleft" size={20} color="#bdc3c7" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>Thêm chi tiêu</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.save}>LƯU</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.item}>
              <TextInput
                style={styles.textInput}
                placeholder="Ghi chú.."
                onChangeText={value => this.onNoteChange(value)}
                multiline={true}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.icon}>
                <Icon name="terminal" size={25} color="#000000" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="1.000.000"
                keyboardType="numeric"
                onChangeText={value => this.onAmountChange(value)}
              />
            </View>
            <View style={styles.itemGroup}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.icon}>
                  <Icon name="question" size={25} color="#000000" />
                </View>
                <Picker
                  style={{height: 50, width: 150}}
                  selectedValue={this.state.category}
                  onValueChange={(itemValue, itemIndex) =>
                    this.onCategoryChange(itemValue, itemIndex)
                  }>
                  {this.state.categories.map(item => {
                    return (
                      <Picker.Item
                        key={item.value}
                        label={item.display}
                        value={item.value}
                      />
                    );
                  })}
                </Picker>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.icon}>
                  <Switch
                    value={this.state.duringDay}
                    onValueChange={this.onDuringDaySwitch}
                  />
                </View>
                <View style={styles.icon}>
                  <Text>Chi tiêu trong ngày</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemGroup}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.icon}>
                  <Icon name="calendar" size={25} color="#000000" />
                </View>
                <View style={styles.textInput}>
                  <TouchableOpacity
                    onPress={this.onFromDatePress}
                    style={{flex: 1}}>
                    <TextInput
                      style={{fontSize: 18}}
                      value={dateConverter(this.state.fromDate)}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  display: this.state.duringDay ? 'none' : 'flex',
                }}>
                <View style={styles.icon}>
                  <Icon name="calendar" size={25} color="#000000" />
                </View>
                <View style={styles.textInput}>
                  <TouchableOpacity
                    onPress={this.onToDatePress}
                    style={{flex: 1}}>
                    <TextInput
                      style={{fontSize: 18}}
                      value={dateConverter(this.state.toDate)}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          {this.state.showFromDate && (
            <DateTimePicker
              value={this.state.fromDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={this.onFromDateChange}
            />
          )}
          {this.state.showToDate && (
            <DateTimePicker
              value={this.state.toDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={this.onToDateChange}
            />
          )}
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#fbfbfb',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ecf0f1',
    borderBottomWidth: 0.5,
    shadowColor: '#ecf0f1',
    shadowRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
  },
  save: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    padding: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    borderColor: '#bdc3c7',
    borderBottomWidth: 0.5,
  },
  footer: {
    padding: 10,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
