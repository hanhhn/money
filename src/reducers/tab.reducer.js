import * as act from '../actions/action';

const tabsReducer = (
  state = {
    outgoing: [],
    incoming: [],
  },
  action,
) => {
  switch (action.type) {
    case act.OutgoingTab:
      return {
        ...state,
        outgoing: action.outgoing,
      };

    case act.IncomingTab:
      return {
        ...state,
        incoming: action.incoming,
      };

    default:
      return state;
  }
};

export default tabsReducer;
