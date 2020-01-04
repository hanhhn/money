import * as act from '../actions/action';

export const getSumMonthOutput = outs => {
  let sum = 0;
  if (outs && outs.length > 0) {
    outs.forEach(day => {
      if (day && day.length > 0) {
        sum += day.reduce((x, y) => {
          return x + (y.amount || 0);
        }, 0);
      }
    });
  }

  return dispatch => {
    dispatch({
      type: act.SumMonthOutput,
      value: sum,
    });
  };
};

export const getSumYearInput = ins => {
  let sum = 0;
  if (ins && ins.length > 0) {
    ins.forEach(day => {
      if (day && day.length > 0) {
        sum += day.reduce((x, y) => {
          return x + (y.amount || 0);
        }, 0);
      }
    });
  }
  return dispatch => {
    dispatch({
      type: act.SumYearInput,
      value: sum,
    });
  };
};
