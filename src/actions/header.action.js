import * as act from '../actions/action';

export const OutgoingOfMonth = outs => {
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
      type: act.UpdateOutgoingOfMonth,
      sum,
    });
  };
};

export const IncomingOfYear = ins => {
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
      type: act.UpdateIncomingOfYear,
      sum,
    });
  };
};
