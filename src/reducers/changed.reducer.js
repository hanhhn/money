import * as act from '../actions/action';

const changedReducer = (
  state = {
    outgoing: false,
    incoming: false,
  },
  action,
) => {
  switch (action.type) {
    case act.DetectChangeOutgoing:
      return {
        ...state,
        outgoing: action.changed,
      };

    case act.DetectChangeIncoming:
      return {
        ...state,
        incoming: action.changed,
      };

    default:
      return {
        outgoing: false,
        incoming: false,
      };
  }
};

export default changedReducer;
