import types from "../types/";
import api from "../../services/api/";

const getReposFromGithub = (q, filter, page, lastResults) => (
  dispatch,
  getState
) => {
  if (lastResults) {
    dispatch({
      type: types.LOAD_MORE_REPOS_FROM_GITHUB,
      payload: lastResults
    });
  } else {
    dispatch({
      type: types.GET_REPOS_FROM_GITHUB
    });
  }

  dispatch({
    type: types.SET_SEARCH_CRITERIA,
    payload: {
      q,
      filter,
      page
    }
  });

  let queryStr = `q=${q}&page=${page}`;
  if (filter) {
    let filterStr;
    switch (filter) {
      case "best-match":
        filterStr = null;
        break;
      case "most-stars":
        filterStr = `&sort=stars&order=desc`;
        break;
      case "fewest-stars":
        filterStr = `&sort=stars&order=asc`;
        break;
      case "most-forks":
        filterStr = `&sort=forks&order=desc`;
        break;
      case "fewest-forks":
        filterStr = `&sort=forks&order=asc`;
        break;
      default:
        filterStr = null;
        break;
    }
    if (filterStr) {
      queryStr = `${queryStr}${filterStr}`;
    }
  }

  api
    .getReposFromGithub(queryStr)
    .then(res => {
      if (res && res.ok) {
        const payload = res.data;

        if (lastResults) {
          let joinedRepos = lastResults.items.concat(payload.items);

          let newPayload = payload;
          newPayload.items = joinedRepos;

          dispatch({
            type: types.LOAD_MORE_REPOS_FROM_GITHUB_SUCCESS,
            payload: newPayload
          });
        } else {
          dispatch({
            type: types.GET_REPOS_FROM_GITHUB_SUCCESS,
            payload
          });
        }
      } else {
        dispatch({
          type: types.GET_REPOS_FROM_GITHUB_ERROR,
          payload: res
        });
      }
    })
    .catch(err => {
      dispatch({
        type: types.GET_REPOS_FROM_GITHUB_ERROR,
        payload: err
      });
    });
};

export default {
  getReposFromGithub
};
