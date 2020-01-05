import * as act from '../actions/action';

const outputReducer = (state = {}, action) => {
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
