import types from "../types/";
import api from "../../services/api/";

const getReposFromGithub = (q, filters, page, lastResults) => (
  dispatch,
  getState
) => {
  console.log("Hit get repos: ", q, filters, page, lastResults);

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
      filters,
      page
    }
  });

  let queryStr = `q=${q}&page=${page}`;
  if (filters) {
    let starsFilter, relevanceFilter;

    if (filters.stars) {
      starsFilter = `&sort=stars&order=${filters.stars}`;
      queryStr = queryStr + starsFilter;
    }
    // if (filters.relevance) {
    // }
    // console.log("Query str and filter str: ", queryStr, filterStr);
  }
  console.log("Final query str: ", queryStr);

  api
    .getReposFromGithub(queryStr)
    .then(res => {
      if (res.ok) {
        const payload = res.data;

        if (lastResults) {
          let joinedRepos = lastResults.items.concat(payload.items);

          let newPayload = payload;
          newPayload.items = joinedRepos;

          // concat...
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
          type: types.GET_REPOS_FROM_GITHUB_ERROR
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
