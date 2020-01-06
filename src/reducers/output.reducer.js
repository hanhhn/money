import * as act from '../actions/action';

const outputReducer = (
  state = {
    amount: 0,
  },
  action,
) => {
  switch (action.type) {
    case act.AddMonthOutput:
      return {
        ...state,
        [action.key]: action.data,
      };

    default:
      return state;
  }
};

export default outputReducer;
