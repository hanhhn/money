import React, {Component} from 'react';
import {Increment, Decrement} from '../actions/counter.action';
import {connect} from 'react-redux';
import Counter from '../components/counter.component';

class CounterContainer extends Component {
  render() {
    return <Counter count={this.props.counterReducer.count} {...this.props} />;
  }
}

export default connect(
  state => {
    return {
      counterReducer: state.counterReducer,
    };
  },
  dispatch => {
    return {
      onIncrement: () => dispatch(Increment()),
      onDecrement: () => dispatch(Decrement()),
    };
  },
)(CounterContainer);
