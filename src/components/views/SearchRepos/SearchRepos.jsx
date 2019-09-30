import React, { Component } from "react";
import { connect } from "react-redux";

import ReduxActions from "../../../redux/actions/index";

class SearchRepos extends Component {
  componentDidMount() {
    this.props.getReposFromGithub();
  }

  render() {
    return <div>Search Repos</div>;
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getReposFromGithub: () => dispatch(ReduxActions.getReposFromGithub())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRepos);
