import * as action from '../actions/action';

export const ShowOutgoing = () => {
  return {
    type: action.ShowOutgoing,
  };
};

export const HideOutgoing = () => {
  return {
    type: action.HideIncoming,
  };
};
