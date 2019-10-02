import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { Provider } from "react-redux";

import Dashboard from "./components/views/Dashboard/Dashboard";
import About from "./components/views/About/About";
import NotFound from "./components/views/NotFound/NotFound";
import Splash from "./components/views/Splash/Splash";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

import store from "./redux/store/";

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
                  <Route path="/" exact component={Splash} />
                  <Route path="/dashboard" exact component={Dashboard} />
                  <Route path="/about" exact component={About} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </MuiThemeProvider>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default AppRouter;
