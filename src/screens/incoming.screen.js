import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Picker,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Incoming extends Component {
  state = {
    date: new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };

  render() {
    const {show, date, mode} = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}>
        <View>
          <View style={styles.container}>
            <View style={styles.header}>
              <View>
                <TouchableOpacity>
                  <Icon name="arrow-left" size={20} color="#bdc3c7" />
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
                  />
                </View>
                <View style={styles.item}>
                  <View style={styles.icon}>
                    <Icon name="calendar" size={25} color="#000000" />
                  </View>
                  <View style={styles.textInput}>
                    <TouchableOpacity
                      onPress={this.datepicker}
                      style={{flex: 1}}>
                      <TextInput
                        style={{fontSize: 18}}
                        value="Today"
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="calendar"
                    />
                  )}
                </View>
                <View style={styles.item}>
                  <View style={styles.icon}>
                    <Icon name="question" size={25} color="#000000" />
                  </View>
                  <Picker
                    style={{height: 50, width: 200}}
                    itemStyle={{backgroundColor: 'red'}}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
              </ScrollView>
            </View>
            <View style={styles.footer}>
              <Text>Footer</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fbfbfb',
    margin: 20,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
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
