import React, { Component } from "react";
import firebase from "./firebase";

class Form extends Component {
  constructor() {
    super();

    // this.state = {
    //   listType: "",
    //   submitValue: ""
    // };
  }
  //   handleSelect = event => {
  //     const selected = event.target.value;
  //     console.log(selected);
  //     this.setState({
  //       listType: selected
  //     });

  //   this.props.handleSelect(selected)

  //     // this.props.handleSelect(selected);
  //   };

  handleInputChange = event => {
    this.setState({
      submitValue: event.target.value
    });
  };

  //   handleSubmit = event => {
  //     event.preventDefault();
  //     if (this.state.submitValue === "") {
  //       alert("Oops! Please put your list here!");
  //     } else {
  //       const dbRef = firebase.database().ref(`/${this.state.listType}`);
  //       dbRef.push(this.state.submitValue);
  //       this.setState({ submitValue: "" });
  //     }
  //   };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="dropdown">
            <h3>Pick your department</h3>
            <label htmlFor="genre" className="visuallyHidden">
              Please Select
            </label>
            <select
              onChange={
                //   we are sending information to the parent component as an argument
                this.props.handleSelect
              }
            >
              <option value="grocery">Grocery</option>
              <option value="household">Household</option>
              <option value="pets">Pets</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="inputField">
            <h4>Add your list</h4>
            <input
              onChange={this.props.handleInputChange}
              type="text"
              value={this.props.handleuserValue}
              // onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
