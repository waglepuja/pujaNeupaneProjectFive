import React, {Component} from 'react';
import './App.css';
import firebase from './firebase';
// import Header from './Header';

class App extends Component {

  constructor(){
    super();

    this.state={
      listType: "grocery",
      grocery: [],
      household: [],
      miscellaneous: [],
      pets: [],
      userValue:"",      
    };
  }

  handleSelect = (event) =>{
    this.setState({
      listType: event.target.value,
    })
  }

  handleInputChange=(event)=>{ 
    this.setState({
      userValue: event.target.value,       
    })
  }

  handleSubmit=(event)=>{
    // event.preventDefault(); 
    // const newState=[];
    // newState.push(this.state.userValue);
    //   this.setState((prevState) => ({
    //   listItems: [...prevState.listItems, ...newState],
    //   userValue:"",   
    // })
    // )
    event.preventDefault();
    const dbRef=firebase.database().ref(this.state.listType);
    dbRef.push(this.state.userValue);
    this.setState({userValue: ""});
  }

  componentDidMount(){
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', (data)=>{
      const response = data.val();

      const newState = {};
      for (let key in response) {
        newState[key] = Object.values(response[key])
      }
      this.setState(newState);
    }); 
  }
  


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Grocery Time!</h1>
          <h2>Can't remember where you left your grocery list?</h2>
          <h3>No problem, we do</h3>
        </header>
        <main class="mainContent">
        <h3>Pick your department</h3>
        <form onSubmit={this.handleSubmit}>
        <label for="genre" class="visuallyHidden">Please Select</label>
          <select onChange={this.handleSelect}>        
            <option value="grocery">Grocery</option>
            <option value="household">Household</option>
            <option value="pets">Pets</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <input onChange={this.handleInputChange} type="text" value={this.state.userValue}/>
          </form>
          <div>
            <p>
              {this.state.listType}
            </p>
            <ul>
              {this.state[this.state.listType].map(item =>{
                return <li>{item}</li>
              })}
            </ul>
          </div>
        </main>
      </div>
      );
  }
  
  
}

export default App;
