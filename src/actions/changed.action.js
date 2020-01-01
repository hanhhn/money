import * as act from '../actions/action';

export const OutgoingChanged = changed => {
  return dispatch => {
    dispatch({
      type: act.DetectChangeOutgoing,
      changed,
    });
  };
};

export const IncomingChanged = changed => {
  return dispatch => {
    dispatch({
      type: act.DetectChangeIncoming,
      changed,
    });
  };
};
