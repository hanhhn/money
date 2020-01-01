import * as act from '../actions/action';

const headerReducer = (
  state = {
    outgoing: 0,
    incoming: 0,
  },
  action,
) => {
  switch (action.type) {
    case act.UpdateOutgoingOfMonth:
      return {
        ...state,
        outgoing: action.sum,
      };

    case act.UpdateIncomingOfYear:
      return {
        ...state,
        incoming: action.sum,
      };

    default:
      return state;
  }
};

export default headerReducer;
