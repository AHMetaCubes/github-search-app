import React, { Component } from "react";

class NotFound extends Component {
  componentDidMount() {
    this.props.history.push("/");
  }
  render() {
    return <div>This page does not exist.</div>;
  }
}

export default NotFound;
