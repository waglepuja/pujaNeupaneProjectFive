import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Header from "./Header";
import Form from "./Form";

class App extends Component {
  constructor() {
    super();

    this.state = {
      listType: "grocery",
      grocery: [],
      household: [],
      miscellaneous: [],
      pets: [],
      userValue: ""
    };
  }
  // FUNCTIONS FOR THE EVENT LISTENER

  handleSelect = event => {
    this.setState({
      listType: event.target.value
    });
  };

  handleInputChange = event => {
    this.setState({
      userValue: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.userValue === "") {
      alert("Oops! Please put your list here!");
    } else {
      const dbRef = firebase.database().ref(this.state.listType);
      dbRef.push(this.state.userValue);
      this.setState({ userValue: "" });
    }
  };

  // COMPONENT DID MOUNT

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", data => {
      const response = data.val();
      const newState = {};
      for (let key in response) {
        newState[key] = Object.values({ id: key, name: response[key] });
      }

      // REMOVING THE ITEMS AND THE LAST ITEM ON THE LIST ON EACH CATEGORY

      if (newState.grocery) {
        this.formatToArray(newState.grocery[1], "grocery");
      }
      if (!newState.grocery) {
        this.setState({
          grocery: []
        });
      }

      if (newState.household) {
        this.formatToArray(newState.household[1], "household");
      }

      if (!newState.household) {
        this.setState({
          household: []
        });
      }

      if (newState.miscellaneous) {
        this.formatToArray(newState.miscellaneous[1], "miscellaneous");
      }
      if (!newState.miscellaneous) {
        this.setState({
          miscellaneous: []
        });
      }

      if (newState.pets) {
        this.formatToArray(newState.pets[1], "pets");
      }
      if (!newState.pets) {
        this.setState({
          pets: []
        });
      }
    });
  }

  // MAP

  formatToArray = (typeObject, type) => {
    const typeInfo = Object.entries(typeObject);
    const data = typeInfo.map(item => ({
      id: item[0],
      item: item[1]
    }));

    if (data[0]) {
      this.setState({ [type]: data });
    } else {
      this.setState({ [type]: [] });
    }
  };

  // REMOVE ITEMS FROM THE LIST

  removeListItem = item => {
    const dbRef = firebase.database().ref(this.state.listType);
    dbRef.child(item).remove();
  };

  // DOM ELEMENTS

  render() {
    return (
      <div className="App">
        <Header />
        <main className="mainContent">
          <Form
            handleSelect={this.handleSelect}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            handleuserValue={this.state.userValue}
          />

          <div>
            <p>{this.state.listType}</p>
            <ul>
              Ckeck your list,<br></br>
              Are you sure this is all you need? keep adding<br></br>
              <span className="list">Click unwanted item to remove!</span>
              {this.state[this.state.listType].map(item => {
                return (
                  <li
                    key={item.id}
                    id={item.id}
                    onClick={() => this.removeListItem(item.id)}
                  >
                    {item.item}
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
        <footer>Created & designed by Puja Neupane</footer>
      </div>
    );
  }
}

export default App;
