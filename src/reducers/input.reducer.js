import * as act from '../actions/action';

const inputReducer = (
  state = {
    amount: 0,
  },
  action,
) => {
  switch (action.type) {
    case act.AddYearInput:
      return {
        ...state,
        [action.key]: action.data,
      };

    default:
      return state;
  }
};

export default inputReducer;
