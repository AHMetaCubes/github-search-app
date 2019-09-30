import types from "../types/";
import api from "../../services/api/";

const getReposFromGithub = (q, filters) => (dispatch, getState) => {
  console.log("Hit get repos: ", q, filters);
  const queryStr = `q=${q}`; //&sort=stars&order=desc
  api
    .getReposFromGithub(queryStr)
    .then(res => {
      dispatch({
        type: types.GET_REPOS_FROM_GITHUB
      });
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
