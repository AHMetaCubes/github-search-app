import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";

const styles = {
  root: {
    // flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    color: "dodgerblue"
  },
  navItem: {
    // just use css so media queries can control the responsiveness
    color: "dodgerblue",
    marginRight: 40,
    marginTop: 20,
    paddingBottom: 20
  },
  navItemActive: {
    // just use css so media queries can control the responsiveness
    color: "dodgerblue",
    borderBottom: "10px solid dodgerblue",
    marginRight: 40,
    marginTop: 30,
    paddingBottom: 20
  },
  menuButton: {
    color: "black",
    marginLeft: 20
  }
};

class Navbar extends Component {
  state = {
    tabValue: 0
  };

  handleRouteChange = (history, route, tabValue, override) => {
    this.setState({ tabValue }, () => {
      if (history.location.search && !override) {
        history.push(route + history.location.search);
      } else {
        history.push(route);
      }
    });
  };

  handleChange = (event, tabValue) => {
    this.setState({ tabValue }, () => {});
  };

  render() {
    const { classes } = this.props;

    const routerTabs = [
      { label: "Search Repos", route: "/" },
      { label: "About", route: "/about" }
    ];

    const renderRouterTabs = () => {
      return (
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={this.state.tabValue}
          // onChange={this.handleChange} -- DONT NEED --- noice?
        >
          {routerTabs.map((tab, i) => {
            const RouterTab = withRouter(({ history }) => (
              <Tab
                label={tab.label}
                style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
                onClick={() =>
                  this.handleRouteChange(history, tab.route, i, false)
                }
              />
            ));
            return <RouterTab />;
          })}
        </Tabs>
      );
    };

    const LogoBtn = withRouter(({ history }) => (
      <div
        id="navLogo"
        onClick={() => this.handleRouteChange(history, "/", 0, true)}
        style={{
          color: "dodgerblue",
          fontSize: 20,
          fontWeight: "bold",
          paddingTop: 10,
          paddingLeft: 10,
          textAlign: "center",
          cursor: "pointer"
        }}
      >
        RepoHunter
      </div>
    ));

    return (
      <div className={classes.root} id="#main-nav">
        <AppBar position="fixed" style={{ background: "white" }}>
          <Grid container>
            <Grid item xs={2}>
              <Grid container>
                <Grid item xs={1}>
                  {/* xs should be 2 when in mobile, 1 is to center logo */}
                  {/* <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton> */}
                </Grid>
                <Grid item xs={10}>
                  <LogoBtn />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              {renderRouterTabs()}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
