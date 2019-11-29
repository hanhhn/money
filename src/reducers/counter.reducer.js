const counterReducer = (
  state = {
    count: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.count,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count + action.count,
      };
    default:
      return state;
  }
};

export default counterReducer;
