import React, { Component } from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  MenuItem,
  MenuList,
  Paper,
  ListItemText,
  Grid,
  Card,
  Avatar,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  Fab,
  Select
} from "@material-ui/core";
import { Star, Code, Clear } from "@material-ui/icons";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import ReduxActions from "../../../redux/actions/index";

const styles = theme => ({
  menuItem: {
    "&:hover": {
      backgroundColor: "grey",
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  activeMenuItem: {
    "$primary, & $icon": {
      color: theme.palette.common.white
    },
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
    // '$primary, & $icon': {
    //     color: theme.palette.common.white,
    // }
  },
  headerMenuItem: {
    "&:hover": {
      backgroundColor: "white"
    },
    "&:focus": {
      backgroundColor: "white"
    },
    cursor: "auto"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  primary: {},
  icon: {}
});

class Dashboard extends Component {
  navBarHeight = 50; // todo: move to utils/metrics etc.
  searchResultsBar = 60;

  state = {
    starsFilter: "",
    relevanceFilter: ""
  };

  componentDidMount() {}

  handleStarsFilterChange = e => {
    this.setState(
      {
        starsFilter: e.target.value,
        relevanceFilter: ""
      },
      () => {
        this.props.getReposFromGithub(
          this.props.search.q,
          {
            stars: this.state.starsFilter,
            relevance: this.state.relevanceFilter
          },
          1,
          null
        );
      }
    );
  };

  handleRelevanceFilterChange = e => {
    this.setState(
      {
        relevanceFilter: e.target.value,
        starsFilter: ""
      },
      () => {
        this.props.getReposFromGithub(
          this.props.search.q,
          {
            stars: this.state.starsFilter,
            relevance: this.state.relevanceFilter
          },
          1,
          null
        );
      }
    );
  };

  // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
  nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  loadMoreRepos = () => {
    // query string, filters array, page number, lastResults object (for pagination infinity scroll) -- with more time would have done backload pagination
    // -- currently page will crash if scroll forever because too many DOM elems
    if (!this.props.repos.isLoadingMore) {
      this.props.getReposFromGithub(
        this.props.search.q,
        {
          stars: this.state.starsFilter,
          relevance: this.state.relevanceFilter
        }, // add filters
        this.props.search.page + 1,
        this.props.repos.results
      );
    }
  };

  renderRepoCards = () => {
    console.log(this.props);

    if (
      !this.props.repos.isFetching &&
      !this.props.repos.err &&
      this.props.repos.results
    ) {
      const results = this.props.repos.results;
      if (results.items && results.items.length) {
        return (
          <div
            style={{
              height:
                window.innerHeight - this.navBarHeight - this.searchResultsBar,
              width: "100%",
              overflowY: "scroll"
            }}
          >
            <InfiniteScroll
              pageStart={this.props.search.page ? this.props.search.page : 0}
              loadMore={this.loadMoreRepos}
              hasMore={true}
              loader={
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    loading more.
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "center",
                      marginBottom: 20
                    }}
                  >
                    <CircularProgress color="black" size={20} />
                  </Grid>
                </Grid>
              }
              useWindow={false}
            >
              <Grid container>
                {results.items.map(repo => {
                  return (
                    <Grid
                      item
                      xs={4}
                      style={{ paddingLeft: 10, paddingTop: 10 }}
                      key={repo.id}
                    >
                      <Card
                        style={{ height: 160, cursor: "pointer" }}
                        onClick={() => {
                          const win = window.open(repo.svn_url, "_blank");
                          win.focus();
                        }}
                      >
                        <Grid
                          container
                          style={{
                            margin: 10
                          }}
                        >
                          <Grid item xs={9}>
                            <div
                              style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                fontSize: 18,
                                fontWeight: "bold"
                              }}
                            >
                              {repo.name}
                            </div>
                          </Grid>
                          <Grid item xs={3}>
                            <Grid container>
                              <Grid
                                item
                                xs={3}
                                style={{
                                  textAlign: "center"
                                }}
                              >
                                <Star
                                  fontSize="small"
                                  style={{
                                    color: "gold"
                                  }}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={8}
                                style={{
                                  marginLeft: 5,
                                  fontSize: 10,
                                  marginTop: 4,
                                  fontWeight: "bold",
                                  textAlign: "left"
                                }}
                              >
                                {this.nFormatter(repo.stargazers_count, 1)}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            style={{
                              padding: 10,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              height: 60,
                              color: "#908b8b"
                            }}
                          >
                            {repo.description}
                          </Grid>
                        </Grid>
                        <Grid container style={{ padding: 10 }}>
                          <Grid item xs={7}>
                            <Grid container>
                              <Grid
                                item
                                xs={2}
                                style={{
                                  textAlign: "left"
                                }}
                              >
                                <Code fontSize="small" />
                              </Grid>
                              <Grid
                                item
                                xs={10}
                                style={{
                                  textAlign: "left",
                                  fontSize: 10,
                                  marginTop: 4,
                                  fontWeight: "bold"
                                }}
                              >
                                {repo.language ? repo.language : "N/A"}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={5}>
                            <Grid container>
                              <Grid
                                item
                                xs={2}
                                style={{
                                  textAlign: "left"
                                }}
                              >
                                <Avatar
                                  style={{ height: 20, width: 20 }}
                                  src={repo.owner.avatar_url}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={9}
                                style={{
                                  textAlign: "left",
                                  fontSize: 10,
                                  marginTop: 4,
                                  fontWeight: "bold",
                                  marginLeft: 5
                                }}
                              >
                                {repo.owner.login}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          </div>
        );
      }
    } else {
      return (
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "center",
              marginTop: 200
            }}
          >
            <CircularProgress size={80} />
          </Grid>
        </Grid>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper
            style={{
              height: window.innerHeight - this.navBarHeight
            }}
          >
            <MenuList>
              <MenuItem
                className={classes.headerMenuItem}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                <ListItemText className={classes.headerText} primary="Sort" />
              </MenuItem>
              <Divider />
              <MenuItem
                className={classes.headerMenuItem}
                style={{ margin: 15 }}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                <FormControl
                  variant="outlined"
                  style={{ width: "100%", marginTop: 5 }}
                >
                  <InputLabel>By Stars</InputLabel>
                  <Select
                    value={this.state.starsFilter}
                    onChange={this.handleStarsFilterChange}
                    labelWidth={60}
                  >
                    <MenuItem value="asc">Minimum</MenuItem>
                    <MenuItem value="desc">Maximum</MenuItem>
                  </Select>
                </FormControl>
                <Clear
                  style={{
                    marginLeft: 10,
                    color: "grey",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState(
                      {
                        starsFilter: ""
                      },
                      () => {
                        this.props.getReposFromGithub(
                          this.props.search.q,
                          {
                            stars: this.state.starsFilter,
                            relevance: this.state.relevanceFilter
                          },
                          1,
                          null
                        );
                      }
                    );
                  }}
                />
              </MenuItem>
              <MenuItem
                className={classes.headerMenuItem}
                style={{ margin: 15 }}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                <FormControl
                  variant="outlined"
                  style={{ width: "100%", marginTop: 5 }}
                >
                  <InputLabel>By Relevance</InputLabel>
                  <Select
                    value={this.state.relevanceFilter}
                    onChange={this.handleRelevanceFilterChange}
                    labelWidth={100}
                  >
                    <MenuItem value="asc">Least</MenuItem>
                    <MenuItem value="desc">Most</MenuItem>
                  </Select>
                </FormControl>
                <Clear
                  style={{
                    marginLeft: 10,
                    color: "grey",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState(
                      {
                        relevanceFilter: ""
                      },
                      () => {
                        this.props.getReposFromGithub(
                          this.props.search.q,
                          {
                            stars: this.state.starsFilter,
                            relevance: this.state.relevanceFilter
                          },
                          1,
                          null
                        );
                      }
                    );
                  }}
                />
              </MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            style={{
              height: this.searchResultsBar,
              width: "100%"
            }}
          >
            <Grid item xs={12}>
              <div style={{ padding: 18, textAlign: "center" }}>
                {this.props.repos.results &&
                this.props.repos.results.items &&
                this.props.repos.results.items.length &&
                this.props.repos.results.total_count
                  ? `${this.props.repos.results.total_count} results for ${this.props.search.q}.`
                  : this.props.repos.isFetching && this.props.search.q
                  ? "Searching..."
                  : `No results for ${this.props.search.q}.`}
              </div>
              <Divider />
            </Grid>
          </Grid>
          {this.renderRepoCards()}
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

const styledComponent = withStyles(styles)(Dashboard);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent);
