// import React, {Component} from 'react';

// class Main extends Component{
//     render(){
//         return (
//         <main class="mainContent">
//         <h3>Pick your department</h3>
//         <form onSubmit={this.handleSubmit}>
//         <label for="genre" class="visuallyHidden">Please Select</label>
//           <select onChange={this.handleSelect}>        
//             <option value="grocery">Grocery</option>
//             <option value="household">Household</option>
//             <option value="pets">Pets</option>
//             <option value="miscellaneous">Miscellaneous</option>
//           </select>
//           <input onChange={this.handleInputChange} type="text" value={this.state.userValue}/>
//           </form>
//           <div>
//             <p>
//               {this.state.listType}
//             </p>
//             <ul>
//               {this.state[this.state.listType].map(item =>{
//                 return <li>{item}</li>
//               })}
//             </ul>
//           </div>
//         </main>
//         )
//     }
// }

// export default Main;