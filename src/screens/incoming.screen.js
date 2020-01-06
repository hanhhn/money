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
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {default as AntIcon} from 'react-native-vector-icons/AntDesign';
import {getInputCategory, dateConverter} from '../cores/helpers/utils.helper';

export default class IncomingScreen extends Component {
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
      date: {
        value: new Date(),
        show: false,
      },
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAmountKeyPress = this.onAmountKeyPress.bind(this);
    this.onDatePress = this.onDatePress.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const categories = getInputCategory();
    this.setState({
      categories: categories,
      category: categories[0].value,
    });
  }

  onNoteChange(value) {
    let valid = true;

    if (value === '' || value === null || value === undefined) {
      valid = false;
    }

    if (value.length < 4) {
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
    if (num > 100000000 || num < 10000) {
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

  onDatePress() {
    this.setState({
      date: {
        value: this.state.date.value,
        show: true,
      },
    });
  }

  onDateChange(event, date) {
    date = date || this.state.date.value;

    this.setState({
      date: {
        value: date,
        show: Platform.OS === 'ios' ? true : false,
      },
    });
  }

  onSaveIncoming() {
    if (!this.state.note.valid) {
      Alert.alert('Thêm thu nhập', 'Ghi chú không hợp lệ.');
      return;
    }

    if (!this.state.amount.valid) {
      Alert.alert('Thêm thu nhập', 'Số tiền thu nhập không hợp lệ.');
      return;
    }

    const request = {
      email: this.props.email,
      year: this.state.date.value.getFullYear(),
      month: this.state.date.value.getMonth() + 1,
      note: this.state.note.value,
      amount: this.state.amount.value,
      category: this.state.category,
      createdDate: new Date(),
    };

    firestore()
      .collection('incomings')
      .doc()
      .set(request)
      .then(() => {
        this.getInputOfYear(this.props.email, request.year);
        Alert.alert('Lưu thành công', 'Lưu thu nhập thành công.');
        this.goBack();
      })
      .catch(err => {
        Alert.alert('Xảy ra lỗi', err);
      });
  }

  goBack() {
    this.props.goBack();
  }

  getInputOfYear(email, year) {
    this.props.getInputOfYear(email, year);
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
            <Text style={styles.title}>Thêm thu nhập</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.onSaveIncoming()}>
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
                multiline={true}
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
              />
            </View>
            <View style={styles.itemGroup}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.icon}>
                  <Icon name="calendar" size={25} color="#000000" />
                </View>
                <View style={styles.textInput}>
                  <TouchableOpacity
                    onPress={this.onDatePress}
                    style={{flex: 1}}>
                    <TextInput
                      style={{fontSize: 18}}
                      value={dateConverter(this.state.date.value)}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.itemGroup}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.icon}>
                  <Icon name="question" size={25} color="#000000" />
                </View>
                <View style={styles.textInput}>
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
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          {this.state.date.show && (
            <DateTimePicker
              value={this.state.date.value}
              mode="date"
              is24Hour={true}
              display="default"
              maximumDate={this.now}
              onChange={this.onDateChange}
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
