import { combineReducers } from "redux";

import types from "../types/";

const repos = (
  state = {
    isFetching: false,
    results: false,
    err: false,
    isLoadingMore: false
  },
  action
) => {
  switch (action.type) {
    case types.GET_REPOS_FROM_GITHUB:
      return {
        isFetching: true,
        results: false,
        err: false,
        isLoadingMore: false
      };
    case types.GET_REPOS_FROM_GITHUB_SUCCESS:
      return {
        isFetching: false,
        results: action.payload,
        err: false,
        isLoadingMore: false
      };
    case types.LOAD_MORE_REPOS_FROM_GITHUB:
      return {
        isFetching: false,
        results: action.payload,
        err: false,
        isLoadingMore: true
      };
    case types.LOAD_MORE_REPOS_FROM_GITHUB_SUCCESS:
      return {
        isFetching: false,
        results: action.payload,
        err: false,
        isLoadingMore: false
      };
    case types.GET_REPOS_FROM_GITHUB_ERROR:
      return {
        isFetching: false,
        results: false,
        err: action.payload,
        isLoadingMore: false
      };
    default:
      return state;
  }
};

const search = (state = { q: false, filters: false, page: false }, action) => {
  switch (action.type) {
    case types.SET_SEARCH_CRITERIA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  repos,
  search
});
