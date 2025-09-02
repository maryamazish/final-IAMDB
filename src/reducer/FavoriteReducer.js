export const FavoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.value];
    case "REMOVE":
      return state.filter((id) => id !== action.value);
    default:
      return state;
  }
};
