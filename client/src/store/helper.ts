export const combineReducers = (reducers) => (state, action) => {
  return Object.keys(reducers).reduce((res, key) => {
    return { ...res, [key]: reducers[key](res[key], action) };
  }, state);
};
