import types from "../types/";
import api from "../../services/api/";

const getReposFromGithub = (q, filters) => (dispatch, getState) => {
  console.log("Hit get repos: ", q, filters);
  dispatch({
    type: types.GET_REPOS_FROM_GITHUB
  });
  dispatch({
    type: types.SET_SEARCH_QUERY_STRING,
    payload: q
  });

  const queryStr = `q=${q}`; //&sort=stars&order=desc

  api
    .getReposFromGithub(queryStr)
    .then(res => {
      if (res.ok) {
        const payload = res.data;
        dispatch({
          type: types.GET_REPOS_FROM_GITHUB_SUCCESS,
          payload
        });
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
