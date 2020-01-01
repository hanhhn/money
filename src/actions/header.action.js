import * as act from '../actions/action';

export const updateOutgoingOfMonth = outs => {
  let sum = 0;
  if (outs && outs.length > 0) {
    outs.forEach(day => {
      sum += day.items.reduce((x, y) => {
        return x.amount + y.amount;
      });
    });
  }

  return dispatch => {
    dispatch({
      type: act.UpdateOutgoingOfMonth,
      sum,
    });
  };
};

export const updateIncomingOfYear = ins => {
  let sum = 0;
  if (ins && ins.length > 0) {
    ins.forEach(day => {
      sum += day.items.reduce((x, y) => {
        return x.amount + y.amount;
      });
    });
  }

  return dispatch => {
    dispatch({
      type: act.UpdateIncomingOfYear,
      sum,
    });
  };
};
