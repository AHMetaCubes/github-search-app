import React, { Component } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Card,
  CardContent
} from "@material-ui/core";

import Footer from "../../common/Footer/Footer";

class About extends Component {
  render() {
    return (
      <Grid container style={{ marginTop: 100, paddingBottom: 200 }}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Card>
            <CardContent>
              <h1 style={{ textTransform: "uppercase" }}>about the app.</h1>
              <Divider />
              <p style={{ margin: 15, marginTop: 15, fontSize: 18 }}>
                This portal was created to help you find relevant and popular
                repos. (And, to secure my opportunity at Travelers Haven!!)
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Footer />
      </Grid>
    );
  }
}

export default About;
