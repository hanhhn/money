import * as act from '../actions/action';

const navigateReducer = (
  state = {
    router: 'MainScreen',
  },
  action,
) => {
  switch (action.type) {
    case act.GoTo:
      return {
        ...state,
        router: action.router,
      };

    case act.GoHome:
      return {
        ...state,
        router: 'MainScreen',
      };

    case act.GoIncoming:
      return {
        ...state,
        router: 'IncomingScreen',
      };

    case act.GoOutgoing:
      return {
        ...state,
        router: 'OutgoingScreen',
      };

    default:
      return state;
  }
};

export default navigateReducer;
