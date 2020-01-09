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
  Switch,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {default as AntIcon} from 'react-native-vector-icons/AntDesign';
import {getOutputCategory, dateConverter} from '../cores/helpers/utils.helper';

export default class OutgoingScreen extends Component {
  now = new Date();
  constructor(props) {
    super(props);
    this.state = {
      note: {
        value: '',
        valid: false,
      },
      amount: {
        value: 0,
        valid: false,
      },
      categories: [],
      category: '',
      duringDay: true,
      fromDate: {
        value: new Date(),
        show: false,
      },
      toDate: {
        value: new Date(),
        show: false,
      },
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAmountKeyPress = this.onAmountKeyPress.bind(this);
    this.onDuringDaySwitch = this.onDuringDaySwitch.bind(this);
    this.onFromDatePress = this.onFromDatePress.bind(this);
    this.onToDatePress = this.onToDatePress.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const categories = getOutputCategory();
    this.setState({
      categories: categories,
      category: categories[0].value,
    });
    if (this.props.id && this.props.id !== '') {
      this.getOutgoing(this.props.id);
    }
  }

  getOutgoing(ref) {
    firestore()
      .doc(ref)
      .get()
      .then(docSnapShot => {
        const data = docSnapShot.data();
        if (data) {
          this.setState({
            note: {
              value: data.note,
              valid: true,
            },
            amount: {
              value: data.amount,
              valid: true,
            },
            category: data.category,
            duringDay: data.from === data.to,
            fromDate: {
              value: new Date(data.year, data.month - 1, data.from),
              show: false,
            },
            toDate: {
              value: new Date(data.year, data.month - 1, data.to),
              show: false,
            },
          });
        }
      });
  }

  onDuringDaySwitch() {
    this.setState({
      duringDay: !this.state.duringDay,
      toDate: {
        value: this.now,
        show: false,
      },
    });
  }

  onNoteChange(value) {
    let valid = true;

    if (value === '' || value === null || value === undefined) {
      valid = false;
    }

    if (value.length < 5) {
      valid = false;
    }

    if (value.length > 30) {
      valid = false;
    }

    this.setState({
      note: {
        value,
        valid,
      },
    });
  }

  onAmountChange(value) {
    let valid = true;

    if (value === '' || value === null || value === undefined) {
      valid = false;
    }

    if (isNaN(+value)) {
      valid = false;
    }

    const num = Number(value);
    if (num > 100000000 || num < 1000) {
      valid = false;
    }

    this.setState({
      amount: {
        value: num ? num : 0,
        valid: valid,
      },
    });
  }

  onAmountKeyPress(e) {
    //new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(35000)
  }

  onCategoryChange(itemValue, itemIndex) {
    this.setState({
      category: itemValue,
    });
  }

  onFromDatePress() {
    this.setState({
      fromDate: {
        value: this.state.fromDate.value,
        show: true,
      },
    });
  }

  onToDatePress() {
    this.setState({
      toDate: {
        value: this.state.toDate.value,
        show: true,
      },
    });
  }

  onFromDateChange(event, date) {
    date = date || this.state.fromDate.value;

    this.setState({
      fromDate: {
        value: date,
        show: Platform.OS === 'ios' ? true : false,
      },
    });
  }

  onToDateChange(event, date) {
    date = date || this.state.toDate.value;

    this.setState({
      toDate: {
        value: date,
        show: Platform.OS === 'ios' ? true : false,
      },
    });
  }

  onSaveOutgoing() {
    if (!this.state.note.valid) {
      Alert.alert('Thêm chi tiêu', 'Ghi chú không hợp lệ.');
      return;
    }

    if (!this.state.amount.valid) {
      Alert.alert('Thêm chi tiêu', 'Số tiền chi tiêu không hợp lệ.');
      return;
    }

    const request = {
      email: this.props.email,
      year: this.state.fromDate.value.getFullYear(),
      month: this.state.fromDate.value.getMonth() + 1,
      from: this.state.fromDate.value.getDate(),
      to: this.state.duringDay
        ? this.state.fromDate.value.getDate()
        : this.state.toDate.value.getDate(),
      note: this.state.note.value,
      amount: this.state.amount.value,
      category: this.state.category,
    };

    if (this.props.id) {
      firestore()
        .doc(this.props.id)
        .update({
          ...request,
          updatedDate: new Date(),
        })
        .then(() => {
          this.getOutputOfMonth(request.year, request.month);
          Alert.alert('Lưu thành công', 'Lưu chi tiêu thành công.');
          this.goBack();
        })
        .catch(err => {
          Alert.alert('Xảy ra lỗi', err);
        });
    } else {
      firestore()
        .collection('outgoings')
        .doc(this.props.id)
        .set({
          ...request,
          createdDate: new Date(),
        })
        .then(() => {
          this.getOutputOfMonth(request.year, request.month);
          Alert.alert('Lưu thành công', 'Lưu chi tiêu thành công.');
          this.goBack();
        })
        .catch(err => {
          Alert.alert('Xảy ra lỗi', err);
        });
    }
  }

  goBack() {
    this.props.goBack();
  }

  getOutputOfMonth(year, month) {
    this.props.getOutputOfMonth(year, month);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.goBack();
              }}>
              <AntIcon name="arrowleft" size={20} color="#bdc3c7" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>Thêm chi tiêu</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.onSaveOutgoing()}>
              <Text style={styles.save}>LƯU</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.item}>
              <TextInput
                style={this.state.note.valid ? styles.textInput : styles.error}
                placeholder="Ghi chú..."
                onChangeText={this.onNoteChange}
                value={this.state.note.value}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.icon}>
                <Icon name="terminal" size={25} color="#000000" />
              </View>
              <TextInput
                style={
                  this.state.amount.valid ? styles.textInput : styles.error
                }
                placeholder="1.000.000"
                keyboardType="numeric"
                onChangeText={this.onAmountChange}
                onKeyPress={this.onAmountKeyPress}
                value={this.state.amount.value.toString()}
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
                      value={dateConverter(this.state.fromDate.value)}
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
                      value={dateConverter(this.state.toDate.value)}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          {this.state.fromDate.show && (
            <DateTimePicker
              value={this.state.fromDate.value}
              mode="date"
              is24Hour={true}
              display="default"
              maximumDate={this.state.toDate.value}
              onChange={this.onFromDateChange}
            />
          )}
          {this.state.toDate.show && (
            <DateTimePicker
              value={this.state.toDate.value}
              mode="date"
              is24Hour={true}
              display="default"
              minimumDate={this.state.fromDate.value}
              maximumDate={new Date()}
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
    borderColor: '#2ecc71',
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 18,
    flex: 1,
    borderColor: '#e74c3c',
    borderBottomWidth: 1,
  },
  footer: {
    padding: 10,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
