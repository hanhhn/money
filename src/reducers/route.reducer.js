import * as act from '../actions/action';
const defaultRouter = 'MainScreen';

const routeReducer = (state = {}, action) => {
  switch (action.type) {
    case act.GoOutgoing:
      return {
        ...state,
        router: 'OutgoingScreen',
      };

    default:
      return state;
  }
};

export default routeReducer;
