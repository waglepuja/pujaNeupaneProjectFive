import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Header from "./Header";
// import Main from './Main';

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
    // event.preventDefault();
    // const newState=[];
    // newState.push(this.state.userValue);
    //   this.setState((prevState) => ({
    //   listItems: [...prevState.listItems, ...newState],
    //   userValue:"",
    // })
    // )
    event.preventDefault();
    const dbRef = firebase.database().ref(this.state.listType);
    dbRef.push(this.state.userValue);
    this.setState({ userValue: "" });
  };

  componentDidMount() {
    const dbRef = firebase.database().ref();
    // const sections = ["grocery", "household"];
    dbRef.on("value", data => {
      const response = data.val();
      // console.log(response);
      const newState = {};
      for (let key in response) {
        newState[key] = Object.values({ id: key, name: response[key] });
      }

      console.log("newState:", newState);

      if (newState.household) {
        this.formatToArray(newState.household[1], "household");
      }

      if (!newState.household) {
        this.setState({
          household: []
        });
      }

      if (newState.grocery) {
        this.formatToArray(newState.grocery[1], "grocery");
      }
      if (!newState.grocery) {
        this.setState({
          grocery: []
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

      if (newState.miscellaneous) {
        this.formatToArray(newState.miscellaneous[1], "miscellaneous");
      }
      if (!newState.miscellaneous) {
        this.setState({
          miscellaneous: []
        });
      }
      // this.setState(newState);
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
          <form onSubmit={this.handleSubmit}>
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

            <input
              onChange={this.handleInputChange}
              type="text"
              value={this.state.userValue}
            />
          </form>
          <div>
            <p>{this.state.listType}</p>
            <ul>
              {/* {Object.keys(list).map(id =>{
                console.log(list[id]);
                console.log("id",id);
                return(
                  <li key={id} id={id} onClick={()=>this.removeListItem(id)}>{list[id]}</li>                  
                ) 
                
              })} */}
              {console.log(this.state[this.state.listType])}
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
      </div>
    );
  }
}

export default App;
