export const Increment = () => {
  return {
    type: 'INCREMENT',
    count: 1,
  };
};

export const Decrement = () => {
  return {
    type: 'DECREMENT',
    count: -1,
  };
};
