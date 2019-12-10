import {ShowOutgoing, HideOutgoing} from '../actions/action';

const outgoingReducer = (
  state = {
    show: false,
  },
  action,
) => {
  switch (action.type) {
    case ShowOutgoing:
      return {
        ...state,
        show: true,
      };

    case HideOutgoing:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default outgoingReducer;
