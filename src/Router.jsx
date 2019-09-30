import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Provider } from "react-redux";

import SearchRepos from "./components/views/SearchRepos/SearchRepos";
import About from "./components/views/About/About";
import NotFound from "./components/views/NotFound/NotFound";
import Navbar from "./components/common/Navbar/Navbar";

import store from "./redux/store/";
// import Footer from "./components/common/Footer/Footer";

import "./index.css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    // only takes hexcodes
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#1e90ff"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <MuiThemeProvider theme={theme}>
              <Navbar />
              <div style={{ marginTop: 50 }}>
                <Switch>
                  <Route path="/" exact component={SearchRepos} />
                  <Route path="/about" exact component={About} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </MuiThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default AppRouter;
