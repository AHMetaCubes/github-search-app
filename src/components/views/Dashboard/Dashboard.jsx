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
  ListItemIcon,
  SearchIcon,
  ListItemText,
  StarIcon,
  TextField,
  Button,
  Grid
} from "@material-ui/core";

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

const DASHBOARD_VIEW_TYPES = {
  search: "SEARCH",
  recommended: "RECOMMENDED"
};

class Dashboard extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={3}>
          <Paper style={{ background: "white", height: window.innerHeight }}>
            <MenuList>
              <MenuItem
                className={classes.headerMenuItem}
                disableRipple
                disableGutters
                disableTouchRipple
              >
                <ListItemText
                  className={classes.headerText}
                  primary="Filters"
                />
              </MenuItem>
              <hr />
              {/* {this.sideNavMenuItems.map(item => {
                  if (this.state.activeSideMenuItem == item.title) {
                    return (
                      <MenuItem className={classes.activeMenuItem}>
                        <ListItemIcon className={classes.icon}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.primary }}
                          inset
                          primary={item.title}
                        />
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() =>
                          this.setState({ activeSideMenuItem: item.title })
                        }
                      >
                        <ListItemIcon className={classes.icon}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.primary }}
                          inset
                          primary={item.title}
                        />
                      </MenuItem>
                    );
                  }
                })} */}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          Test
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
