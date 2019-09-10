import React, { Component } from "react";
import firebase from "./firebase";

class Form extends Component {
  constructor() {
    super();
  }

  handleInputChange = event => {
    this.setState({
      submitValue: event.target.value
    });
  };

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
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
