import {ShowIncoming, HideIncoming} from '../actions/action';

const incomingReducer = (
  state = {
    show: false,
  },
  action,
) => {
  switch (action.type) {
    case ShowIncoming:
      return {
        ...state,
        show: true,
      };

    case HideIncoming:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default incomingReducer;
