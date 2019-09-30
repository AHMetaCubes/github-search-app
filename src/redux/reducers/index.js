import { combineReducers } from "redux";

import types from "../types/";

const repos = (
  state = { isFetching: false, results: [], err: false },
  action
) => {
  switch (action.type) {
    case types.GET_REPOS_FROM_GITHUB:
      return { isFetching: true };
    case types.GET_REPOS_FROM_GITHUB_SUCCESS:
      return { isFetching: false, results: action.payload, err: false };
    case types.GET_REPOS_FROM_GITHUB_ERROR:
      return { isFetching: false, results: [], err: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  repos
});
