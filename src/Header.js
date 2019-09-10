import React, { Component } from "react";
import firebase from "./firebase";

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Let's Go Paperless!</h1>
          <h2>Can't remember where you left your grocery list?</h2>
          <h3>No problem, we do</h3>
        </header>
      </div>
    );
  }
}

export default Header;
