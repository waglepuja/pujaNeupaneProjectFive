import React, {Component} from 'react';
import './App.css';
import firebase from './firebase';
import Header from './Header';
// import Main from './Main';

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
        // console.log(response,key);
        newState[key] = Object.values({id: key,name:response[key]})

      }
      console.log(newState);
      this.setState(newState);
    }); 
  }

  removeListItem =(item)=>{
    const dbRef=firebase.database().ref("grocery");
    console.log("item", item)
    dbRef.child(item).remove();
    
  }
  
  render(){
    // const list= this.state[this.state.listType][1];

    let list ={};
    if(this.state[this.state.listType][1] !== undefined){
      list=this.state[this.state.listType][1];
    }
    
    return (
      <div className="App">
         <Header/>
         {/* <Main/> */}
        <header className="App-header">
          <h1>Grocery Time!</h1>
          <h2>Can't find your grocery list?</h2>
          <h3>we can help</h3>
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
              
              {Object.keys(list).map(id =>{
                console.log(list[id]);
                return(
                  <li id={id} onClick={()=>this.removeListItem(id) }>{list[id]}</li>                  
                ) 
                
              })}
            </ul>
          </div>
        </main>
      </div>
      );
  }
  
  
}

export default App;
