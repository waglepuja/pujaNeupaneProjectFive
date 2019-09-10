import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Header from "./Header";
import Form from "./Form";
// import List from "./List";

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

  handleSelect = event => {
    console.log(event.target.value);
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

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", data => {
      const response = data.val();
      // console.log(response);
      const newState = {};
      for (let key in response) {
        newState[key] = Object.values({ id: key, name: response[key] });
      }

      console.log("newState:", newState);

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

  formatToArray = (typeObject, type) => {
    const typeInfo = Object.entries(typeObject);
    const data = typeInfo.map(item => ({
      id: item[0],
      item: item[1]
    }));
    console.log(data);
    if (data[0]) {
      this.setState({ [type]: data });
    } else {
      this.setState({ [type]: [] });
    }
  };

  // REMOVE ITEMS FROM THE LIST

  removeListItem = item => {
    const dbRef = firebase.database().ref(this.state.listType);
    console.log("item", item);
    dbRef.child(item).remove();
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Main/> */}
        {/* <header className="App-header">
          <h1>Grocery Time!</h1>
          <h2>Can't find your grocery list?</h2>
          <h3>no problem,we can help</h3>
        </header> */}
        <main className="mainContent">
          <Form
            handleSelect={this.handleSelect}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            handleuserValue={this.state.userValue}
          />
          {/* <form onSubmit={this.handleSubmit}>
            <div className="dropdown">
              <h3>Pick your department</h3>
              <label htmlFor="genre" className="visuallyHidden">
                Please Select
              </label>
              <select onChange={this.handleSelect}>
                <option value="grocery">Grocery</option>
                <option value="household">Household</option>
                <option value="pets">Pets</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="inputField">
              <h4>Add your list</h4>
              <input
                onChange={this.handleInputChange}
                type="text"
                value={this.state.userValue}
                // onClick={this.handleSubmit}
              />
            </div>
          </form> */}
          <div>
            <p>{this.state.listType}</p>
            <ul>
              Ckeck your list,<br></br>
              Are you sure this is all you need?<br></br>
              <span className="list">keep adding</span>
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

                // <SweetAlert
                //   show={this.state.showAlertCreate}
                //   type="info"
                //   title="Oops! Please fill out a description and pick a time frame to proceed"
                //   confirmButtonColor="#2D3A65"
                //   text={this.state.showAlertText}
                //   inputValue="Try Again"
                //   onConfirm={() => this.setState({ showAlertCreate: false })}
                // />;
              })}
            </ul>
          </div>
        </main>
        <footer>Created & designed by Puja Neupane</footer>
        {/* <div>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-whatsapp"></i>
        </div> */}
      </div>
    );
  }
}

export default App;
