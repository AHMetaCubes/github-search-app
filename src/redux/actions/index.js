import types from "../types/";
import api from "../../services/api/";

const getReposFromGithub = () => (dispatch, getState) => {
  console.log("Hit get repos");
  const query = "q=tetris+language:assembly&sort=stars&order=desc";
  api
    .getReposFromGithub(query)
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

// const postDcmFile = file => (dispatch, getState) => {
//   dispatch({
//     type: types.POST_DCM_FILE_REQUEST
//   });
//   const study = {
//     studyInstanceUid: file.studyInstanceUid,
//     seriesInstanceUid: file.seriesInstanceUid
//   };
//   dpaApi
//     .postDcmFile(study)
//     .then(res => {
//       if (res.ok) {
//         dispatch({
//           type: types.POST_DCM_FILE_REQUEST_SUCCESS,
//           payload: res
//         });
//         dispatch(getDcmFiles());
//       } else {
//         dispatch({
//           type: types.POST_DCM_FILE_REQUEST_ERROR,
//           payload: res
//         });
//       }
//     })
//     .catch(err => {
//       dispatch({
//         type: types.POST_DCM_FILE_REQUEST_ERROR,
//         payload: err
//       });
//     });
// };

export default {
  getReposFromGithub
};
