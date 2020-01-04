import * as act from '../actions/action';

const headerReducer = (
  state = {
    input: 0,
    output: 0,
  },
  action,
) => {
  switch (action.type) {
    case act.SumMonthInput:
      return {
        ...state,
        input: action.value,
      };

    case act.SumYearOutput:
      return {
        ...state,
        output: action.value,
      };

    default:
      return state;
  }
};

export default headerReducer;
