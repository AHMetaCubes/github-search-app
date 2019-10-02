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

import "./css/style.css";

class About extends Component {
  render() {
    return (
      <Grid container style={{ marginTop: 100, paddingBottom: 200 }}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Card>
            <CardContent>
              <h3 style={{ textTransform: "uppercase" }}>about the app.</h3>
              <Divider />
              <p style={{ margin: 15, fontSize: 18 }}>
                This portal was created to help you find relevant and popular
                repos.
              </p>
              <br />
              <p style={{ margin: 15, fontSize: 18 }}>
                And to show some via emmet extension -- Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Necessitatibus consequuntur,
                et architecto recusandae ab quo non illum veritatis beatae! Cum
                explicabo distinctio officia recusandae! Explicabo illo quos
                deleniti voluptatem enim?
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default About;
