import React, { Component } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider
} from "@material-ui/core";
import { connect } from "react-redux";

import ReduxActions from "../../../redux/actions/index";

import "./css/style.css";

class Splash extends Component {
  state = {
    searchText: "",
    isSearchError: false
  };

  handleSearchTextChange = e => {
    if (e.target.value) {
      this.setState({
        isSearchError: false
      });
    }
    this.setState({
      searchText: e.target.value
    });
  };

  handleEnterKeyPress = e => {
    if (e.key == "Enter" || e.keyCode == 13) {
      this.doSearchForRepos();
    }
  };

  doSearchForRepos = () => {
    if (this.state.searchText) {
      this.setState({
        isSearchError: false
      });
      this.props.history.push("/dashboard");
      this.props.getReposFromGithub(this.state.searchText, null, 1, null); // todo: add filters
    } else {
      this.setState({
        isSearchError: true
      });
    }
  };

  render() {
    return (
      <Grid container>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <div style={{ marginTop: 50, marginBottom: 20, textAlign: "left" }}>
              <h1 style={{ textTransform: "uppercase" }}>
                hunt for the right repository.
              </h1>
              <div style={{ color: "dodgerblue", marginTop: -20 }}>
                <span style={{ fontWeight: 400, fontSize: 26 }}>
                  Enhance your skills -
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    marginLeft: 10,
                    fontSize: 26,
                    fontStyle: "italic"
                  }}
                >
                  contribute to an open-source project!
                </span>
              </div>
            </div>
          </Grid>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Grid item xs={12}>
                <h3 style={{ textTransform: "uppercase" }}>explore</h3>
                <Divider />
              </Grid>
              <Grid
                container
                style={{
                  height: 150,
                  padding: 15,
                  marginTop: 40,
                  marginBottom: 30
                }}
              >
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <TextField
                    id="searchInput"
                    label="What?"
                    placeholder="Material-UI, React, Angular etc."
                    helperText={
                      this.state.isSearchError
                        ? "Please enter a repository name or keywords."
                        : "repository name or keywords"
                    }
                    fullWidth
                    type="search"
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      style: {
                        height: 35
                      }
                    }}
                    onKeyPress={this.handleEnterKeyPress}
                    value={this.state.searchText}
                    onChange={this.handleSearchTextChange}
                    InputProps={{
                      autoFocus: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Search."
                            onClick={() => {
                              this.doSearchForRepos();
                            }}
                          >
                            <i className="fas fa-search"></i>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={this.state.isSearchError}
                    InputLabelProps={{
                      shrink: true,
                      focused: true,
                      style: {
                        fontWeight: "bold",
                        fontSize: 24,
                        color: this.state.isSearchError ? "red" : "dodgerblue"
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={this.doSearchForRepos}
                  style={{
                    backgroundColor: "dodgerblue",
                    paddingLeft: 25,
                    paddingRight: 25,
                    fontSize: 18,
                    width: 200,
                    color: "white"
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Grid item xs={12}>
                <h3 style={{ textTransform: "uppercase" }}>for you</h3>
                <Divider />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 15 }}>
                Coming soon!
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getReposFromGithub: (q, filters, page, lastResults) =>
      dispatch(ReduxActions.getReposFromGithub(q, filters, page, lastResults))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
