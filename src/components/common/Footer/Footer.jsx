import React, { Component } from "react";
import { Grid, Divider } from "@material-ui/core";

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 50,
          width: "100%",
          backgroundColor: "white"
        }}
      >
        <Divider />
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4} style={{ marginTop: 15, textAlign: "center" }}>
            <div
              style={{
                color: "#908b8b",
                cursor: "pointer"
              }}
              onClick={() => {
                window.open(
                  "https://github.com/TheReactGuys?tab=repositories",
                  "_blank"
                );
              }}
            >
              @thereactguys
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Footer;
