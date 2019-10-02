import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";
// todo all files ... import PropTypes from 'prop-types';

const styles = {
  grow: {
    flexGrow: 1,
    color: "dodgerblue"
  },
  navItem: {
    // todo: css media queries
    color: "dodgerblue",
    marginRight: 40,
    marginTop: 20,
    paddingBottom: 20
  },
  navItemActive: {
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

    const LogoBtn = withRouter(({ history }) => {
      const btn =
        window.innerWidth > 800 ? (
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
        ) : (
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
            RH
          </div>
        );
      return btn;
    });

    return (
      <AppBar position="fixed" style={{ background: "white" }}>
        <Grid container>
          <Grid item xs={2}>
            <Grid container>
              {/* TODO: for mobile navDrawer */}
              {/* <Grid item xs={1}> */}
              {/* xs should be 2 when in mobile, 1 is to center logo */}
              {/* <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton> */}
              {/* </Grid> */}
              <Grid item xs={10}>
                <LogoBtn />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            {renderRouterTabs()}
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
